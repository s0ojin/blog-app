import { Route, Routes } from "react-router-dom";

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
}
