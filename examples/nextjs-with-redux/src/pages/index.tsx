import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { readSample } from '../redux/modules/resources/sample'
import { Layout } from '../components/templates/Layout'
import { initialSteps } from '../utils/initialSteps'

function IndexPage() {
  const sample = useSelector(state => state.resources.sample)
  return <Layout>{sample.meta.loading ? null : <Pre>{JSON.stringify(sample, null, 2)}</Pre>}</Layout>
}

IndexPage.getInitialProps = initialSteps(readSample)

const Pre = styled.pre`
  margin: 10px;
  padding: 10px;
  background: #222;
  color: white;
`

export default IndexPage
