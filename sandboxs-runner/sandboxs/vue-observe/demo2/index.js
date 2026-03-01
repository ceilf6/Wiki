var user = {
  name: '袁进',
  birth: '2002-5-7',
};

observe(user); // 观察

// 显示姓氏
function showFirstName() {
  document.querySelector('#firstName').textContent = '姓：' + user.name[0];
}

// 显示名字
function showLastName() {
  document.querySelector('#lastName').textContent = '名：' + user.name.slice(1);
}

// 显示年龄
function showAge() {
  var birthday = new Date(user.birth);
  var today = new Date();
  today.setHours(0), today.setMinutes(0), today.setMilliseconds(0);
  thisYearBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  );
  var age = today.getFullYear() - birthday.getFullYear();
  if (today.getTime() < thisYearBirthday.getTime()) {
    age--;
  }
  document.querySelector('#age').textContent = '年龄：' + age;
}

// 直接调用三个 show 的话界面不会跟着数据变
// 但是该调用哪几个呢？调用那些依赖、使用了变化属性的
autorun(showFirstName);
autorun(showLastName);
autorun(showAge);
