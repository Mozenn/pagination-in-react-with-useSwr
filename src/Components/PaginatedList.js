import useSWR from "swr";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import Plant from "./Plant";
import Pagination from "./Pagination";
import SortButton from "./SortButton";

const fetcher = async (url) => {
  console.log("url", url);
  const res = await axios.get(url);

  console.log("res", res.data);
  return res.data;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const PlantContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const PaginatedList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("desc");
  const limit = 5;

  const { data, error } = useSWR(
    `${process.env.REACT_APP_API_URL}/plant?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`,
    fetcher
  );

  console.log(data);

  if (!data || !data.items) {
    return null;
  }

  return (
    <Container>
      <SortButton order={order} setOrder={setOrder} />
      <PlantContainer>
        {data.items.map((plant) => (
          <Plant plant={plant} key={plant.name} />
        ))}
      </PlantContainer>
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        total={data.total}
      />
    </Container>
  );
};

export default PaginatedList;
