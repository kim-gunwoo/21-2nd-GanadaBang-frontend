import { useState, useEffect } from 'react';
import { POST_ROOMS_API } from '../../config';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components/macro';

const SaleRoom = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [jibunDetailAddress, setJibunDetailAddress] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isOpenPost, setIsOpenPost] = useState(false);

  const emptyImageArray = previewImages.length === 0;

  const uploadPhotoFile = e => {
    if (e.target.files) {
      const fileArray = [...e.target.files].map(file =>
        URL.createObjectURL(file)
      );

      setPreviewImages(previewImages => previewImages.concat(fileArray));
    }
  };

  const removePhoto = idx => {
    setPreviewImages([
      ...previewImages.slice(0, idx),
      ...previewImages.slice(idx + 1, previewImages.length),
    ]);
    console.log(idx, previewImages, previewImages.length);
  };

  const showPhotoList = image =>
    image.map((photo, idx) => {
      return (
        <PhotoPreviewImage key={idx}>
          <img src={photo}></img>
          <PhotoDelete id={idx} onClick={() => removePhoto(idx)}></PhotoDelete>
        </PhotoPreviewImage>
      );
    });

  const openDaumPostCode = () => {
    setIsOpenPost(!isOpenPost);
  };

  const changeAddress = e => {
    setInputValue(e.target.value);
  };

  const onCompletePost = data => {
    console.log(data);
    let fullAddr = data.address;
    let roadFullAddr = data.roadAddress;
    let dongFullAddr = data.jibunAddress;

    let dongIndex = dongFullAddr.indexOf('동');
    if (fullAddr.includes('길')) {
      setRoadAddress(fullAddr);
      setJibunAddress(dongFullAddr.slice(0, dongIndex + 1));
      setJibunDetailAddress(dongIndex + 1, dongFullAddr.length);
    } else {
      setJibunAddress(fullAddr.slice(0, dongIndex + 1));
      setJibunDetailAddress(dongIndex + 1, fullAddr.length);
      setRoadAddress(roadFullAddr);
    }
    setIsOpenPost(false);
  };

  const submitSaleRoom = () => {
    if (previewImages) {
      const fd = new FormData();
      fd.append('filename', previewImages);

      fetch(`${POST_ROOMS_API}`, {
        method: 'POST',
        body: {
          address: jibunAddress,
          detail: jibunDetailAddress,
          files: fd,
        },
      })
        .then(res => res.json())
        .then(res => console.log(res));
    }
  };

  return (
    <SaleBox>
      <SaleWrap>
        <SaleTitle>방 내놓기</SaleTitle>
        <PostPhotoSection>
          <PostPhotoTitle>사진 등록</PostPhotoTitle>
          <PhotoPreviewBox>
            <PhotoPreviewGrayBox emptyImageArray={emptyImageArray}>
              {previewImages !== [] && showPhotoList(previewImages)}
              {emptyImageArray && (
                <CautionaryPhrase>
                  실 사진 최소 3장 이상 등록 하셔야 하며, 가로 사진을
                  권장합니다.
                </CautionaryPhrase>
              )}
              {emptyImageArray && (
                <CautionaryPhrase color="red">
                  가나다방 로고를 제외한 불필요한 정보(워터마크, 상호, 전화번호
                  등)가 있는 매물은 비공개 처리 됩니다.
                </CautionaryPhrase>
              )}
              {emptyImageArray && (
                <PostPhotoLabel htmlFor="inputFile">
                  사진 추가하기
                </PostPhotoLabel>
              )}
              {!emptyImageArray && (
                <MorePostPhotoLabel htmlFor="inputFile">
                  사진 추가하기
                </MorePostPhotoLabel>
              )}
              <PostPhotoInput
                type="file"
                id="inputFile"
                accept="image/jpg,impge/png,image/jpeg,image/gif"
                multiple
                onChange={uploadPhotoFile}
              ></PostPhotoInput>
            </PhotoPreviewGrayBox>
          </PhotoPreviewBox>
        </PostPhotoSection>
        <PostAddressSection>
          <PostAddressTitle>위치 정보</PostAddressTitle>
          <PostAddressBox>
            <SelectAddressTitle>주소</SelectAddressTitle>
            <SelectAddress>
              <WriteAddressBox>
                <WriteAddress
                  placeholder="예)번동 10-1, 강북구 번동"
                  onChange={changeAddress}
                ></WriteAddress>
                <AddressSearchButton onClick={openDaumPostCode}>
                  주소 검색
                </AddressSearchButton>
                {isOpenPost && (
                  <DaumPostcode
                    style={PostCodeStyle}
                    autoClose
                    onComplete={onCompletePost}
                    defaultQuery={inputValue}
                  />
                )}
              </WriteAddressBox>
              <ShowAddress>
                <AddressContextBox>
                  <p>
                    <span>도로명:</span>
                    {roadAddress}
                  </p>
                  <p>
                    <span>지 번:</span>
                    {jibunAddress}
                    {jibunDetailAddress}
                  </p>
                </AddressContextBox>
              </ShowAddress>
            </SelectAddress>
            <ShowSelectMap>지도</ShowSelectMap>
          </PostAddressBox>
        </PostAddressSection>
        <SubmitButton onClick={submitSaleRoom}>매물등록</SubmitButton>
      </SaleWrap>
    </SaleBox>
  );
};

export default SaleRoom;

const SaleBox = styled.div`
  ${({ theme }) => theme.flexSet()};
  width: 100%;
  margin-top: 10rem;
`;

const SaleWrap = styled.div`
  width: 120rem;
  text-align: center;
`;

const SaleTitle = styled.div`
  margin-bottom: 5rem;
  color: #222222;
  font-size: 33px;
  font-weight: 400;
`;

const PostPhotoSection = styled.section`
  margin-bottom: 50px;
  border-radius: 4px;
  box-shadow: #0000000d 0px 1px 5px 0px;
  border: 1px solid #e2e2e2;
  background-color: #ffffff;
  overflow: hidden;
`;

const PostAddressSection = styled(PostPhotoSection)``;

const PostPhotoTitle = styled.div`
  width: 100%;
  padding: 2rem 0;
  font-size: 18px;
  font-weight: bold;
  color: #222222;
  border-bottom: 1px solid #cccccc;
  position: relative;
`;

const PostAddressTitle = styled(PostPhotoTitle)``;

const PhotoPreviewBox = styled.div`
  width: 100%;
  height: 362px;
  padding: 1.6rem;
`;

const PhotoPreviewGrayBox = styled.div`
  display: flex;
  justify-content: ${({ emptyImageArray }) =>
    !emptyImageArray ? 'initial' : 'center'};
  align-items: ${({ emptyImageArray }) =>
    !emptyImageArray ? 'initial' : 'center'};
  flex-direction: ${({ emptyImageArray }) =>
    !emptyImageArray ? 'initial' : 'column'};
  flex-wrap: ${({ emptyImageArray }) => (emptyImageArray ? 'initial' : 'wrap')};
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  padding: 0.8rem;
`;

const PhotoPreviewImage = styled.div`
  position: relative;
  width: 22.4rem;
  height: 15.5rem;
  margin: 0 0.6rem 0.4rem 0;
  border: 3px solid #ffffff;

  img {
    width: 100%;
    height: 100%;
  }
`;

const PhotoDelete = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 2.4rem;
  height: 2.4rem;
  border: 3px solid #ffffff;
  background-color: #666666;
  z-index: 5;
  cursor: pointer;

  &::after,
  &::before {
    content: '';
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &::before {
    width: 2px;
    height: 11.3137px;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    width: 11.3137px;
    height: 2px;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

const CautionaryPhrase = styled.div`
  font-size: 1.5rem;
  color: ${({ color }) => (color === 'red' ? '#ef4351' : '#666666')};
  margin-top: 0.5rem;
  margin-bottom: ${({ color }) => (color === 'red' ? '3rem' : '0')};
`;

const PostPhotoLabel = styled.label`
  height: 4rem;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 500;
  background-color: #232d4a;
  padding: 1.2rem 2rem;
  border: 0px;
  border-radius: 3px;
  cursor: pointer;
`;

const MorePostPhotoLabel = styled.label`
  ${({ theme }) => theme.flexSet()};
  width: 22.4rem;
  height: 15.5rem;
  border: 3px solid #ffffff;
  background-color: #d8d8d8;
  font-size: 1.4rem;
  color: #222222;
  cursor: pointer;
`;

const PostPhotoInput = styled.input`
  display: none;
`;

const PostAddressBox = styled(PhotoPreviewBox)`
  display: flex;
  padding: 0px;
`;

const SelectAddressTitle = styled.div`
  ${({ theme }) => theme.flexSet()};
  width: 15rem;
  color: #222222;
  font-size: 1.5rem;
  font-weight: 500;
  background-color: #f9f9f9;
`;

const SelectAddress = styled.div`
  flex: 1;
  width: 530px;
  padding: 1.8rem 0 1.8rem 1.8rem;
`;

const ShowSelectMap = styled.div`
  flex: 1;
  width: 44rem;
  height: 33rem;
  margin: 1.8rem;
  border: 1px solid #dddddd;
  position: relative;
`;

const WriteAddressBox = styled.div`
  ${({ theme }) => theme.flexSet()};
  position: relative;
`;

const WriteAddress = styled.input`
  padding: 0px 16px;
  color: #4c4c4c;
  font-size: 14px;
  border: 1px solid #dfdfdf;
  border-radius: 2px;
  background-color: #ffffff;
  width: 386px;
  height: 46px;
`;

const AddressSearchButton = styled.button`
  flex-grow: 1;
  height: 46px;
  margin-left: 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  border: 0px;
  border-radius: 3px;
  background-color: #232d4a;
`;

const ShowAddress = styled.div`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
  height: 100px;
  padding: 0px 15px;
  margin: 1.8rem 0;
  border: 1px solid #d0d2d6;
  background-color: #ffffff;
`;

const AddressContextBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};

  p {
    color: #888888;
    font-size: 15px;
    line-height: 22px;

    span {
      margin-right: 1.6rem;
    }
  }
`;

const AddresDetailBox = styled.div`
  ${({ theme }) => theme.flexSet('space-between', 'center')};
`;

const AddresDetail = styled.input`
  padding: 0px 16px;
  color: #4c4c4c;
  font-size: 14px;
  border: 1px solid #dfdfdf;
  border-radius: 2px;
  background-color: #ffffff;
  -webkit-box-flex: 1;
  flex-grow: 1;
  height: 46px;

  &::nth-child(1) {
    margin-right: 2rem;
  }
`;

const PostCodeStyle = {
  display: 'block',
  position: 'absolute',
  top: '0%',
  width: '400px',
  height: '400px',
  padding: '7px',
  backgroundColor: 'white',
  boxShadow: '#0000000d 0px 1px 5px 0px',
  border: '1px solid #e2e2e2',
};

const SubmitButton = styled.button`
  width: 160px;
  height: 50px;
  color: #ffffff;
  font-size: 15px;
  border: 0px;
  margin-bottom: 5rem;
  background-color: #1a5ae8;
  cursor: pointer;
`;
