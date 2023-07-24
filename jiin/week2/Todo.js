document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  const searchbar = document.getElementById("searchbar");
  const todobox = document.getElementById("todobox").getElementsByTagName("ul")[0];

  // 할 일 추가
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // 새로고침 방지

    const inputValue = searchbar.value.trim(); //공백 제거
    if (inputValue !== "") { // 공백은 허용하지 않음
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox">
        <p>${inputValue}</p>
        <button class="edit">수정</button>
        <button class="del">삭제</button>
      `;
      todobox.appendChild(li);
      searchbar.value = ""; // 입력창 비우기

      addEditButtonFunctionality(li); // 수정 버튼 기능 추가
      addDeleteButtonFunctionality(li); // 삭제 버튼 기능 추가
    }
  });

  // 전체 선택
  const selectAllButton = document.querySelector("#selectall");
  selectAllButton.addEventListener("click", function() {
    const checkboxes = document.querySelectorAll("#todobox li input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = true; // 모든 체크박스 선택
    });
  });

  // 전체 해제
  const deselectAllButton = document.querySelector("#alloff");
  deselectAllButton.addEventListener("click", function() {
    const checkboxes = document.querySelectorAll("#todobox li input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = false; // 모든 체크박스 해제
    });
  });

  // 선택 삭제
  const deleteSelectedButton = document.querySelector("#delselection");
  deleteSelectedButton.addEventListener("click", function() {
    const checkboxes = document.querySelectorAll("#todobox li input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkbox.parentElement.remove(); // 선택된 체크박스의 부모인 <li>를 제거
      }
    });
  });

  // 전체 삭제
  const deleteAllButton = document.querySelector("#runbutton button:nth-child(4)");
  deleteAllButton.addEventListener("click", function() {
    todobox.innerHTML = ""; // 모든 리스트 제거
  });

  // 수정 버튼 기능
  function addEditButtonFunctionality(listItem) {
    const editButton = listItem.querySelector(".edit");
    editButton.addEventListener("click", function() {
      const pTag = listItem.querySelector("p");
      const newText = prompt("새로운 내용을 입력하세요:", pTag.textContent);
      if (newText !== null && newText.trim() !== "") { // 공백은 허용하지 않음
        pTag.textContent = newText;
      }
    });
  }

  // 삭제 버튼 기능
  function addDeleteButtonFunctionality(listItem) {
    const deleteButton = listItem.querySelector(".del");
    deleteButton.addEventListener("click", function() {
      listItem.remove(); // 해당 리스트 아이템 제거
    });
  }
});