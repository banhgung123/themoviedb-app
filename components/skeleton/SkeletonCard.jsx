import styled from 'styled-components';

const SkeletonCardStyled = styled.div`
    .loader {
        display: flex;
        flex-wrap: wrap;
    }

    .skeleton-card {
        height: 55vh;
        width: calc((100% / 4) - 16px);
        margin: 8px;
        border-radius: 3px;
        transition: all 200ms ease-in-out;
        position: relative;
        background-color: #eaeaea;
    }

    .skeleton-card::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
        animation: load 1s infinite;
    }

    @keyframes load {
        100% {
          transform: translateX(100%);
        }
    }

    @media screen and (min-width: 769px) {
        .skeleton-card {
            width: calc(100% / 2 - 16px);
        }
    }
  
    @media screen and (max-width: 767px) {
        .skeleton-card {
            width: calc(100% - 16px);
        }
    }
`;

function SkeletonCard() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <SkeletonCardStyled>
        <div className="loader">
            {arr.map(a => <div key={a} className="skeleton-card"/>)}
        </div>
    </SkeletonCardStyled>
  )
}

export default SkeletonCard;