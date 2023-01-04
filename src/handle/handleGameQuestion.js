function getMultipleRandom(arr, num) {
  // xáo trộn mảng ngẫu nhiên
  const shuffled = [...arr]?.sort(() => 0.5 - Math.random()) || [];
  // lấy ra num phần tử đầu
  return shuffled.slice(0, num);
}

export default function handleGameQuestion(arrVoc, number) {
  let resultArr = [];
  const vocs = getMultipleRandom(arrVoc, number) || [];
  if (vocs.length > 0) {
    vocs.forEach((item) => {
      let question = { id: item.id, cards: [] };
      // tạo card sai
      let otherCard1 = arrVoc[Math.floor(Math.random() * arrVoc.length)];
      let otherCard2 = arrVoc[Math.floor(Math.random() * arrVoc.length)];
      while (otherCard1.id === item.id) {
        otherCard1 = arrVoc[Math.floor(Math.random() * arrVoc.length)];
      }
      while (otherCard2.id === item.id) {
        otherCard2 = arrVoc[Math.floor(Math.random() * arrVoc.length)];
      }
      while (otherCard1.id === otherCard2.id) {
        otherCard2 = arrVoc[Math.floor(Math.random() * arrVoc.length)];
      }
      // tạo bộ 4 cards
      let cards = [
        {
          id: item.id + "1",
          tag: 1,
          title: item.name_card,
          value: true,
        },
        {
          id: item.id + "2",
          tag: 2,
          title: item.mean_viet,
          value: true,
        },
        {
          id: item.id + "3",
          tag: 0,
          title: otherCard1.name_card || "identification",
          value: false,
        },
        {
          id: item.id + "4",
          tag: 0,
          title: otherCard2.mean_viet || "Xác minh",
          value: false,
        },
      ];
      cards = getMultipleRandom(cards, 4);
      question = { ...question, cards };
      // random thứ tự thẻ
      // thêm vào mảng kết quả
      resultArr.push(question);
    });
  }

  return resultArr;
}
