'use client';

import styled from "@emotion/styled";

interface PageProps {
  params: {
    id: string;
  }
}

const StyledDiv = styled.div`background-color: blue`;

export default function AnimeDetails({ params }: PageProps) {
  return (<StyledDiv>
    ini halaman details {params.id}
  </StyledDiv>)
}