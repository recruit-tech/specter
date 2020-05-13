import React from 'react'
import styled from '@emotion/styled'

export function Layout(props: { children: React.ReactNode }) {
  return <Container>{props.children}</Container>
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: auto;
  height: auto;
`
