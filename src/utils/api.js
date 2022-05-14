const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (nodeId) => {
  try {
    const response = await fetch(
      `${API_END_POINT}${nodeId ? `/${nodeId}` : ""}`
    );
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (e) {
    alert("고양이 사진 정보를 제대로 불러오지 못했습니다!");
    console.log(e.message);
  }
};
