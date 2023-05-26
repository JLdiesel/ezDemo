function remark(newVal, oldVal) {
  if (!newVal) {
    this.persons = [];
    this.keywordsIndex = [];
    this.nowIndex = -1;
    return;
  }
  const index = this.getAddIndex(newVal, oldVal, this.nowIndex);
  if (index >= 0 || !~index) {
    this.nowIndex = index;
  } else {
    if (index.startsWith('$')) {
      const nowIndex = index.replace('$', '');
      if (nowIndex <= this.nowIndex) {
        this.nowIndex++;
        return;
      }
    } else {
      const nowIndex = index.replace('*', '');
      if (nowIndex <= this.nowIndex) {
        this.nowIndex--;
        return;
      }
    }
  }

  if (!~this.nowIndex) {
    this.persons = [];
    this.keywordsIndex = [];
    return;
    // 证明用户输入回车 取消搜索
  } else {
    let index = 0;
    // 证明用户输入了@
    const index1 = newVal.indexOf('@', this.nowIndex + 1);
    const index2 = newVal.indexOf(' ', this.nowIndex + 1);
    const index3 = newVal.indexOf('\n', this.nowIndex + 1);
    const arr = [index1, index2, index3].filter((item) => ~item);
    if (arr.length) {
      index = Math.min(...arr);
    } else {
      index = newVal.length;
    }
    const newKeyWordsIndex = [this.nowIndex + 1, index];
    if (
      newKeyWordsIndex[0] === this.keywordsIndex[0] &&
      newKeyWordsIndex[1] === this.keywordsIndex[1]
    )
      return;
    this.keywordsIndex = newKeyWordsIndex;
    const keyword = newVal.substring(...newKeyWordsIndex);
    this.searchByKeyword(keyword);
  }
  // 用户输入了文字
}
function getAddIndex(newVal, oldVal, nowIndex) {
  let j = 0;
  if (newVal.length > oldVal.length) {
    for (let i = 0; i < newVal.length; i++) {
      if (newVal[i] === oldVal[j]) {
        j++;
        continue;
      } else {
        if (newVal[i] === '@') {
          return i;
        } else if (['\n'].includes(newVal[i])) {
          return -1;
        } else {
          return `$${i}`;
        }
      }
    }
  } else {
    for (let i = 0; i < oldVal.length; i++) {
      if (newVal[i] === oldVal[j]) {
        j++;
      } else {
        if (oldVal[i] === '@' && i === nowIndex) {
          return -1;
        } else {
          return `*${i}`;
        }
      }
    }
  }
}
function selectPerson(item) {
  let prev = this.remark.substring(0, this.keywordsIndex[0]);
  const next = this.remark.substring(this.keywordsIndex[1], this.remark.length);
  prev += item.alias ? `${item.alias}-${item.name} ` : item.name;
  this.remark = prev + next;
  this.selectedPersons.push(item);
  this.nowIndex = -1;
  this.persons = [];
  this.keywordsIndex = [];
  this.$refs.textarea.focus();
}
