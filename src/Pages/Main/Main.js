import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useOutsideClick } from '../../Util/inputOutsideClick';
import { POST_SEARCHFILTERED_API } from '../../config';
import { icons } from '../../icons';
import SearchModal from '../../Components/SearchModal/SearchModal';
import RecommendProduct from '../../Components/RecommendProduct/RecommendProduct';
import styled from 'styled-components/';

function Main() {
  const [inputValue, setInputValue] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const { isActive, setIsActive, inputEl } = useOutsideClick();

  const changeInputValue = useCallback(e => {
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    fetch(
      `${POST_SEARCHFILTERED_API}?address=${inputValue}&type=district&category=L4`,
      {
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.address) {
          setFilterData([...data.address]);
        }
      });
  }, [inputValue]);

  useEffect(() => {
    fetch(`http://localhost:3000/data/mainProductList.json`)
      .then(res => res.json())
      .then(res => setRandomData(res));
  }, [setRandomData]);

  return (
    <>
      <SearchBackGround>
        <MainWrap>
          <SearchTitle>어떤 방을 찾으세요?</SearchTitle>
          <Categorieswrap>
            <Category>매물</Category>
            <Category>분양</Category>
          </Categorieswrap>
          <SearchBox ref={inputEl}>
            <SearchIcon src={icons.searchIcon} />
            <SearchInput
              onChange={changeInputValue}
              onClick={() => setIsActive(true)}
              placeholder="지역 또는 단지명을 입력하세요."
            />
            {isActive && <SearchModal filterData={filterData} />}
          </SearchBox>
        </MainWrap>
      </SearchBackGround>
      <MainSection>
        <MainWrap>
          <RecommedBox>
            <div>
              <RecommendTitle>추천매물</RecommendTitle>
              <RecommendSubTitle>
                최근 검색조건으로 등록된 신규 매물입니다.
              </RecommendSubTitle>
            </div>
            <RoomSpecWrap>
              <div>
                <RoomSpec>원룸, 투 · 쓰리룸, 오피스텔</RoomSpec>
                <RoomSpec>월세, 전세</RoomSpec>
              </div>
              <MoreRoom to="/map">
                더 많은 방 보기
                <img src={icons.arrowrightIcon} />
              </MoreRoom>
            </RoomSpecWrap>
            <RoomListBox>
              <RecommendProduct randomData={randomData} />
            </RoomListBox>
          </RecommedBox>
        </MainWrap>
        <BannerSection>
          <BannerImage src="/image/ganadabangBanner.png"></BannerImage>
          <BannerBackground />
        </BannerSection>
      </MainSection>
    </>
  );
}

const SearchBackGround = styled.div`
  ${props => props.theme.flexSet()};
  width: 100%;
  height: 46.5rem;
  background-image: linear-gradient(
    134deg,
    #13b7cf -5%,
    #365bb4 56%,
    #365bb4 56%
  );
`;

const MainSection = styled.section`
  ${props => props.theme.flexSet('center', 'center', 'column')};
  width: 100%;
  margin-top: 10rem;
`;

const MainWrap = styled.div`
  width: 120rem;
  padding: 0 1rem;
`;

const SearchTitle = styled.h1`
  margin-top: 10rem;
  font-size: 4rem;
  font-weight: 300;
  color: #ffffff;
`;

const Categorieswrap = styled.div`
  ${props => props.theme.flexSet('flex-start')};
  margin: 5rem 0 2.5rem;
`;

const Category = styled.div`
  padding-right: 2rem;
  font-size: 1.6rem;
  color: ${props => props.theme.white};
  cursor: pointer;
  user-select: none;

  &::after {
    content: '';
    display: block;
    width: 100%;
    margin-top: 0.8rem;
    border-bottom: 2px solid #ffffff;
    opacity: 0;
  }

  &:hover {
    color: #ffffff;

    &::after {
      opacity: 1;
    }
  }
`;

const SearchBox = styled.div`
  ${props => props.theme.flexSet('flex-start')};
  position: relative;
  width: 100%;
  height: 7.2rem;
  padding: 0 4rem;
  background-color: white;
  border-radius: 2px;
`;

const SearchIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const SearchInput = styled.input`
  flex: 1 1 0%;
  height: 2.7rem;
  margin-left: 2rem;
  font-size: 1.8rem;
`;

const RecommedBox = styled.section`
  width: 100%;
`;

const RecommendTitle = styled.span`
  margin-right: 1rem;
  font-size: 2.4rem;
  color: ${props => props.theme.black};
`;

const RecommendSubTitle = styled.span`
  font-size: 1.3rem;
  color: ${props => props.theme.lightGray};
`;

const RoomSpecWrap = styled.div`
  ${props => props.theme.flexSet('space-between')};
  margin: 3rem 0 2rem;
`;

const RoomSpec = styled.span`
  padding: 0.8rem 1.2rem;
  margin-right: 1rem;
  border: 1px solid #e7e7e7;
  background-color: #ffffff;
  font-size: 1.4rem;
  color: ${props => props.theme.gray};
`;

const MoreRoom = styled(Link)`
  font-size: 1.5rem;
  color: ${props => props.theme.gray};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.blue};
  }

  img {
    width: 2.3rem;
    height: 1.3rem;
  }
`;

const RoomListBox = styled.section`
  ${props => props.theme.flexSet('space-between')};
  margin: 2rem 0;
`;

const BannerSection = styled.section`
  ${props => props.theme.flexSet()};
  position: relative;
  width: 100%;
  margin-top: 10rem;
`;

const BannerImage = styled.img`
  width: 120rem;
`;

const BannerBackground = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 18rem;
  z-index: -1;
  background-color: #97b7de;
`;

export default Main;
