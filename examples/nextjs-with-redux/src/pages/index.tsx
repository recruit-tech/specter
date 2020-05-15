import React, { useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch, batch } from "react-redux";
import { readSample } from "../redux/modules/resources/sample";
import { Layout } from "../components/templates/Layout";
import { readCount, updateCount } from "../redux/modules/resources/counter";

function IndexPage() {
  const sample = useSelector((state) => state.resources.sample);
  const count = useSelector((state) => state.resources.count);
  const dispatch = useDispatch();
  useEffect(() => {
    batch(() => {
      dispatch(readSample());
      dispatch(readCount());
    });
  }, []);
  const increment = useCallback(() => {
    dispatch(updateCount());
  }, [dispatch]);

  const update = useCallback(() => {
    dispatch(readCount());
  }, [dispatch]);

  return (
    <Layout>
      {sample.meta.loading ? null : (
        <Pre>{JSON.stringify(sample, null, 2)}</Pre>
      )}
      <div>
        <span>{count.data.count}</span>
        <button disabled={count.meta.loading} onClick={increment}>
          increment
        </button>
        <button disabled={count.meta.loading} onClick={update}>
          update
        </button>
      </div>
    </Layout>
  );
}

const Pre = styled.pre`
  margin: 10px;
  padding: 10px;
  background: #222;
  color: white;
`;

export default IndexPage;
