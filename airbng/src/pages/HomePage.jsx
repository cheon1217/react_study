import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/home/TopBar";
import Greeting from "../components/home/Greeting";
import InfoCard from "../components/home/InfoCard";
import CategorySection from "../components/home/CategorySection";
import PopularSection from "../components/home/PopularSection";

function HomePage() {
  const navigate = useNavigate();

  // 짐 타입 카드 클릭 시
  const handleCategoryClick = (index, isLoggedIn) => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동할까요?")) {
        navigate("/page/login");
      }
      return;
    }
    const jimTypeIdMap = { 0: 1, 1: 2, 2: 4, 3: 5 };
    if (index === 1) {
      // 캐리어: 소형/대형 선택 모달 구현 필요
      // 예시: navigate(`/page/lockerSearch?jimTypeId=2`);
      // 예시: navigate(`/page/lockerSearch?jimTypeId=3`);
    } else {
      const jimTypeId = jimTypeIdMap[index];
      if (jimTypeId) {
        navigate(`/page/lockerSearch?jimTypeId=${jimTypeId}`);
      }
    }
  };

  // 인기 보관소 클릭 시 상세 페이지로 이동
  const handlePopularClick = (lockerId) => {
    navigate(`/page/lockers/${lockerId}`);
  };

  return (
    <>
      <div className="top-section">
        <TopBar />
        <Greeting />
      </div>
      <InfoCard locationName="강남구" />
      <CategorySection onCategoryClick={handleCategoryClick} />
      <PopularSection onPopularClick={handlePopularClick} />
    </>
  );
}

export default HomePage;