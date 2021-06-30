import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

function ListBox() {
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch('/data/dummy.json', {
      method: 'GET',
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log(res.message);
        setProduct(res.message);
        // data를 응답 받은 후의 로직
      });
  }, []);
  return (
    <>
      <List>
        <Title>해당층</Title>
        <ListDetail>{product.floor}층</ListDetail>
      </List>
      <List>
        <Title>전용면적</Title>
        <ListDetail> {product.room_area}㎡</ListDetail>
      </List>
      <List>
        <Title>방 수/욕실 수</Title>
        <ListDetail>
          {product.room_count} / {product.bathroom_count}
        </ListDetail>
      </List>
      <List>
        <Title>방향</Title>
        <ListDetail>북동</ListDetail>
      </List>
      <List>
        <Title>난방종류</Title>
        <ListDetail>{product.heating_type}</ListDetail>
      </List>
      <List>
        <Title>빌트인</Title>
        <ListDetail>빌트인 주방</ListDetail>
      </List>
      <List>
        <Title>건물 주차수</Title>
        <ListDetail>총 0대</ListDetail>
      </List>
      <List>
        <Title>세대당 주차수</Title>
        <ListDetail>0대</ListDetail>
      </List>
      <List>
        <Title>엘리베이터</Title>
        <ListDetail>{product.elevator}</ListDetail>
      </List>
      <List>
        <Title>반려동물</Title>
        <ListDetail>불가능</ListDetail>
      </List>
      <List>
        <Title>베란다/발코니</Title>
        <ListDetail>없음</ListDetail>
      </List>
      <List>
        <Title>전세자금대출</Title>
        <ListDetail>불가능</ListDetail>
      </List>
      <List>
        <Title>입주가능일</Title>
        <ListDetail>즉시입주</ListDetail>
      </List>
      <List>
        <Title>주용도</Title>
        <ListDetail>공동주택</ListDetail>
      </List>
      <List>
        <Title>사용승인일</Title>
        <ListDetail>2021-05-10</ListDetail>
      </List>
      <List>
        <Title>최초 등록일</Title>
        <ListDetail>{product.created_at}</ListDetail>
      </List>
    </>
  );
}

const List = styled.li`
  ::before {
    content: '.';
    color: rgb(34, 34, 34);
    margin-right: 7px;
  }
  display: inline-flex;
  width: 25%;
  height: 50px;
  border-bottom: 1px solid #ebebeb;
  line-height: 50px;
`;

const Title = styled.p`
  width: 95px;
  color: rgb(134, 134, 134);
  font-size: 1.4rem;
`;

const ListDetail = styled.div`
  font-size: 1.4rem;
`;
export default ListBox;
