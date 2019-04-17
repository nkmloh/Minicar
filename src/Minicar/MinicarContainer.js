import styled from 'styled-components';
const MinicarContainer = styled.div`
  display: flex;
  margin: 0px 0px 20px 0px;
  transition: ${(props) => props.sliding ? 'none' : `transform ${props.speed}s ease`};
  transform: ${(props) => {
    if (!props.sliding) {
        return `translateX(-${props.width}px)`
    }

    if (props.direction === 'prev') {
      return `translateX(calc(2 * (0% - ${props.width}px)))`
    }
    return 'translateX(0px)'
  }};
`
export default MinicarContainer