import React from 'react';
import styled from 'styled-components/macro';

function Icon() {
  return (
    <>
      <Button>
        <svg
          xmlns="http://www.w3.org.2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <g fill-rule="evenodd">
            <path
              fill-rule="evenodd"
              d="M 12.945 3.518 c 2.096 -2.028 5.423 -2.028 7.518 0 l 0.117 0.117 c 1.945 2.01 1.892 5.215 -0.117 7.16 h 0 l -3.768 3.646 l -4.699 4.548 l -3.752 -3.631 l -0.016 -0.015 l -4.699 -4.548 c -2.009 -1.945 -2.061 -5.15 -0.116 -7.16 l 0.116 -0.117 h 0 c 2.096 -2.028 5.423 -2.028 7.518 0 l 0.949 0.92 Z"
              transform="translate(-250, -216) translate(250, 121) translate(0, 92) translate(0, 3)"
            />
          </g>
        </svg>
      </Button>
      <Dibs>4</Dibs>
      <Point>•</Point>
      <svg
        xmlns="http://www.w3.org.2000/svg"
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          stroke="#222"
          d="M 8 3.5 c 3.935 0 6.293 2.46 7.223 3.68 c 0.185 0.242 0.277 0.531 0.277 0.82 c 0 0.289 -0.092 0.578 -0.277 0.82 c -0.93 1.22 -3.288 3.68 -7.223 3.68 c -3.936 0 -6.293 -2.46 -7.223 -3.68 C 0.592 8.578 0.5 8.289 0.5 8 c 0 -0.289 0.092 -0.578 0.277 -0.82 C 1.707 5.96 4.064 3.5 8 3.5 Z"
        />
        <circle cx="8" cy="8" r="2.5" stroke="#222" />
      </svg>
      <Look>최근 7일 10회</Look>
      <Point>•</Point>
      <Button>
        <Copy
          xmlns="http://www.w3.org.2000/svg"
          width="27px"
          height="27px"
          viewBox="0 0 27 27"
          fill="none"
        >
          <path
            stroke="#222222"
            strokeWidth="1.2"
            strokeLinecap="round"
            d="M 17.6823 13.3944 L 20.0923 10.9844 C 21.3383 9.73838 21.3383 7.71738 20.0923 6.47138 C 18.8453 5.22438 16.8233 5.22438 15.5773 6.47138 L 12.3523 9.69438 C 11.1063 10.9414 11.1063 12.9624 12.3523 14.2084 M 9.053 13.0728 L 6.643 15.4828 C 5.397 16.7298 5.397 18.7508 6.643 19.9968 C 7.89 21.2438 9.912 21.2438 11.158 19.9968 L 14.383 16.7728 C 15.629 15.5258 15.629 13.5048 14.383 12.2588"
          />
        </Copy>
      </Button>
      <Point>•</Point>
      <Button>
        <svg
          xmlns="http://www.w3.org.2000/svg"
          width="17px"
          height="17px"
          viewBox="0 0 17 17"
          fill="#222"
        >
          <path d="M 7.49999 0 H 9.49998 V 3 H 7.49999 V 0 Z" />
          <path d="M 14.9387 2.00014 L 16.3586 3.414 L 14.2275 5.53612 L 12.8251 4.11975 L 14.9387 2.00014 Z" />
          <path d="M 2.06224 2.00514 L 4.18185 4.11875 L 2.76799 5.53861 L 0.645874 3.40749 L 2.06224 2.00514 Z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 4.46447 6.46447 C 5.40215 5.52678 6.67392 5 8 5 H 9 C 10.3261 5 11.5979 5.52678 12.5355 6.46447 C 13.4732 7.40215 14 8.67392 14 10 V 16 H 17 V 17 H 0 V 16 H 3 V 10 C 3 8.67392 3.52678 7.40215 4.46447 6.46447 Z M 4 16 H 13 V 10 C 13 8.93913 12.5786 7.92172 11.8284 7.17157 C 11.0783 6.42143 10.0609 6 9 6 H 8 C 6.93913 6 5.92172 6.42143 5.17157 7.17157 C 4.42143 7.92172 4 8.93913 4 10 V 16 Z"
          />
        </svg>
      </Button>
      <Report>허위매물신고</Report>
    </>
  );
}

const Button = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  align-items: center;
  margin-left: 10px;
`;

const Dibs = styled.p`
  margin: 10px;
  font-size: 1.5rem;
`;

const Point = styled.p`
  margin: 0 16px;
`;

const Look = styled.p`
  margin: 10px;
  font-size: 1.4rem;
`;

const Copy = styled.svg`
  margin-left: -10px;
`;

const Report = styled.p`
  font-size: 1.2rem;
`;

export default Icon;
