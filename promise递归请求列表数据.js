export function dataStatisticsCommon(interfaceFunc, params = {}) {
  let apiFunc = interfaceFunc;
  let currentPage = 1,
    pageSize = 100,
    page = 1,
    limit = 100,
    data = [],
    _this = this;
  return new Promise((resolve, reject) => {
    async function _startApiRequest() {
      let arg = arguments[0];
      let requestParams = {
        ...arg,
        currentPage,
        page,
      };
      await _this.dataSourceMap[apiFunc]
        .load(requestParams)
        .then((response) => {
          const totalCount = response.totalCount;
          const res = response.values || response.data || [];
          const currCount = res.length;
          data = data.concat(res);
          // 判断请求到的数据和总数据量作比较 小于就认为还有数据
          if ((currentPage - 1) * pageSize + currCount < totalCount) {
            currentPage++;
            page++;
            let requestParams = {
              ...arg,
              currentPage,
              page,
            };
            _startApiRequest(requestParams);
          } else {
            resolve(data);
          }
        })
        .catch(() => {
          resolve(data);
        });
    }

    let totalParams = {
      ...params,
      currentPage,
      pageSize,
      page,
      limit,
    };
    _startApiRequest(totalParams);
  });
}
