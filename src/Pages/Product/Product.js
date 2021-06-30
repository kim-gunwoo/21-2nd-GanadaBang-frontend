import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import ListBox from './ListBox/ListBox';
import CookieIcon from './CookieIcon/CookieIcon';

function Product() {
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);

  const OptionList = product.normal_option?.map(option => {
    return (
      <div>
        <Optionimg alt="옵션사진" src={option.image_url} />
        <OptionName>{option.name}</OptionName>
      </div>
    );
  });

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

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
    <ProductInner>
      <Container>
        <Header>
          <Detail>
            <RoomInformation>
              <RoomType>{product.title}</RoomType>
              <div>
                <Price>
                  월세{product.deposit}/{product.monthly_rent}
                </Price>
              </div>
            </RoomInformation>
            <FloorArea>
              <RoomArea>전용면적</RoomArea>
              <Acreage>{product.room_area}</Acreage>
            </FloorArea>
            <Lrealestate>
              <Agent>{product.agent}</Agent>
              <PhoneNumber>연락처보기</PhoneNumber>
            </Lrealestate>
          </Detail>
          <DetailInner>
            <CookieIcon />
          </DetailInner>
        </Header>
        <Info>
          <Confirm>
            <ConfirmYear>매물 2021</ConfirmYear>
            <ConfirmedItem>확인된 매물입니다.</ConfirmedItem>
          </Confirm>
          <InfoDetail>
            <ListBox />
          </InfoDetail>
        </Info>
        <Photo>
          <Number>매물 번호 20730964</Number>
          <PhotoList>
            <PhotoMain>
              <Img
                alt="방안내사진"
                src={product?.image}
                // src="https://i1.wp.com/www.gangnamoneroom.com/wp-content/uploads/2019/08/cdpc.jpg?resize=480%2C360"
              />
            </PhotoMain>
            <PhotoSide>
              <div>
                <Img alt="방사이드" src={product?.image} />
              </div>
              <div>
                <Img alt="방사이드" src={product?.image} />
              </div>
              <div>
                <Img alt="방사이드" src={product?.image} />
              </div>
              <SideSlide>
                <SlidesPlus onClick={openModal}></SlidesPlus>
                <Img alt="방안내사진" src={product?.image} />
              </SideSlide>
            </PhotoSide>
          </PhotoList>
        </Photo>
        <div>
          <TextDetail>
            <TextContent>
              위코드역 도보 6분 풀옵션 원룸 위치 좋고 가격 좋은 신축급 컨디션
              깔끔한 집
            </TextContent>
            <TextContentDetail>
              -조용한 주택가에 위치한 다가구 원룸 -입구는 1층이나 창문쪽은
              지층이 있어 2층 높이 -새로 도배를 했으며 기본적인 수리는 마쳐놓은
              상태 -샤시는 이번에 새로 함 -인근에 이 동네 번화가가 위치해 있어
              생활이 편리 -롯데슈퍼가 1분거리에 있고 서초역 부근에 롯데마트가
              있음 -조금 멀리 보자면 서울 성모병원이나 고속터미널 남부터미널
              백화점등이 버스로 3~4정거장 내에 있어 이용이 편리 -반려동물은
              불가x
            </TextContentDetail>
          </TextDetail>
        </div>
      </Container>
      <div>
        <FixScroll>
          <Scroll>
            <ScrollBar>
              <BarPrice>월세 1000/55만원</BarPrice>
              <ScrollAgent>
                <BarAgent>{product.agent}</BarAgent>
              </ScrollAgent>
              <BarPhoneNumber>연락처 보기</BarPhoneNumber>
            </ScrollBar>
          </Scroll>
          <ProductAdditional>
            <AdditionalInner>
              <A>가격정보</A>
              <A>옵션</A>
              <A>위치</A>
              <A>추천매물</A>
            </AdditionalInner>
          </ProductAdditional>
        </FixScroll>
        <RoomDetail>
          <RoomPrice>
            <RoomTitle>가격정보</RoomTitle>
          </RoomPrice>
          <Option>
            <RoomTitle>옵션</RoomTitle>
            <OptionInner>{OptionList}</OptionInner>
          </Option>
          <Location>
            <RoomTitle>위치</RoomTitle>
          </Location>
          <Recommendation>
            <RoomTitle>추천매물</RoomTitle>
          </Recommendation>
        </RoomDetail>
      </div>
    </ProductInner>
  );
}

//스타일 컴포넌트
const ProductInner = styled.div`
  margin-top: 85px;
  width: 100%;
`;

const Container = styled.div`
  position: relative;
  width: 1200px;
  height: 100%;
  margin: 0px auto;
  padding: 0px 10em;
`;

const Header = styled.div`
  align-items: center;
  width: 100%;
  padding-top: 35px;
  margin-bottom: 25px;
`;

const Detail = styled.ul`
  margin-bottom: 35px;
  display: flex;
`;

const RoomInformation = styled.li``;

const RoomType = styled.p`
  margin-bottom: 5px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.gray};
`;

const Price = styled.h3`
  font-size: 30px;
`;

const FloorArea = styled.li`
  padding-left: 28px;
  margin-left: 28px;
  border-left: 1px solid #e7e7e7;
`;

const Acreage = styled.h3`
  font-size: 30px;
`;
const RoomArea = styled.p`
  margin-bottom: 5px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.gray};
`;

const Lrealestate = styled.li`
  ${props => props.theme.flexSet('flex-end')}
  flex: 1 1 0%;
  padding-left: 28px;
  margin-left: 28px;
  border-left: 1px solid #e7e7e7;
`;

const Agent = styled.p`
  margin-bottom: 5px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.gray};
`;

const PhoneNumber = styled.button`
  border: 1px solid #dddddd;
  border-radius: 19px;
  background-color: ${({ theme }) => theme.white};
  width: 80px;
  height: 33px;
  margin-left: 12px;
  cursor: pointer;
`;

const DetailInner = styled.div`
  display: flex;
  height: 22px;
  align-items: center;
`;

const Info = styled.div`
  width: 100%;
`;

const Confirm = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  background-color: rgb(54, 101, 206);
  line-height: 36px;
  text-align: left;
`;

const ConfirmYear = styled.p`
  padding: 0px 20px 0px 15px;
  color: ${({ theme }) => theme.white};
  font-weight: 400;
  font-size: 1.3rem;
  background-color: #0640c0;
`;

const ConfirmedItem = styled.p`
  padding: 0px 20px 0px 15px;
  color: ${({ theme }) => theme.white};
  font-weight: 400;
  font-size: 1.1rem;
`;

const InfoDetail = styled.ul`
  border-top: 2px solid #222222;
  display: flex;
  flex-wrap: wrap;
`;

const Photo = styled.div`
  position: relative;
  margin-top: 30px;
`;

const Number = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-flex;
  align-items: center;
  height: 42px;
  padding: 0px 15px;
  border-radius: 3px;
  background-color: #545554;
  color: ${({ theme }) => theme.white};
`;

const PhotoList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const PhotoMain = styled.div``;

const PhotoSide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const SideSlide = styled.div`
  ::after {
  }
`;

const SlidesPlus = styled.div`
  position: absolute;
  width: calc(100% / 4);
  height: 50%;
  background-color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
`;

const TextDetail = styled.div`
  display: flex;
  min-height: 260px;
  margin-top: 50px;
  padding-bottom: 130px;
`;

const TextContent = styled.div`
  font-size: 2rem;
  min-width: 420px;
  padding-right: 150px;
`;

const TextContentDetail = styled.div`
  font-size: 16px;
  line-height: 26px;
  white-space: pre-wrap;
  padding-right: 20px;
`;

const ProductAdditional = styled.div`
  border: 1px solid #dddddd;
  height: 58px;
  line-height: 56px;
  background-color: #ffffff;
`;

const FixScroll = styled.div`
  display: inline-block;
  position: sticky;
  width: 100%;
  top: 0px;
  z-index: 110;
`;

const Scroll = styled.div`
  width: 100%;
  position: relative;
  z-index: 3;
  background-color: #326cf9;
  height: 90px;
`;

const ScrollBar = styled.div`
  display: flex;
  margin: 0px auto;
  padding: 0px 10px;
  width: 1200px;
  height: 100%;
  z-index: 2;
  align-items: center;
`;

const BarPrice = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 25px;
  font-weight: 400;
`;

const ScrollAgent = styled.div`
  margin-left: auto;
`;

const BarAgent = styled.p`
  margin-right: 12px;
  color: ${({ theme }) => theme.white};
  font-size: 1.6rem;
`;

const BarPhoneNumber = styled.button`
  height: 44px;
  margin-left: 20px;
  padding: 0px 23px;
  border: 0px;
  border-radius: 3px;
  background-color: #ffffff;
  color: #326cf9;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;

const AdditionalInner = styled.div`
  display: flex;
  font-size: 1.7rem;
  justify-content: center;
  width: 1200px;
  margin: 0 auto;
`;

const A = styled.a`
  margin: 0 auto;
  cursor: pointer;
`;

const RoomDetail = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0px auto;
  padding: 0px 10px;
`;

const RoomPrice = styled.div`
  padding-top: 120px;
  padding-bottom: 120px;
`;

const Option = styled.div`
  padding-top: 120px;
  padding-bottom: 120px;
  position: relative;
  border-top: 1px solid #dddddd; ;
`;

const RoomTitle = styled.p`
  font-size: 28px;
  font-weight: 400;
  text-align: center;
  line-height: 41px;
`;

const OptionInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 104px;
  margin-top: 32px;
`;

const Optionimg = styled.img`
  width: 162px;
  height: 70px;
  margin-top: 40px;
`;

const OptionName = styled.p`
  margin-top: 5px;
  font-size: 1.5rem;
  line-height: 25px;
  text-align: center;
`;

const Location = styled.div`
  position: relative;
  padding-top: 120px;
  padding-bottom: 120px;
  border-top: 1px solid #dddddd;
`;

const Recommendation = styled.div`
  padding-top: 120px;
  padding-bottom: 120px;
  border-top: 1px solid #dddddd;
`;
//ListBox

export default Product;
