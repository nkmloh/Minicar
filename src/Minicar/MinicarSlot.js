import styled from 'styled-components';

const MinicarSlot = styled.div`
  flex-basis: 5%;
  margin-right: 3px;
  margin-left: 3px;
  order: ${(props) => props.order};
`
//  flex: 1 0 100%;
export default MinicarSlot;