
// 切割去重
function splitPath(t) {
  let arr = t.split("/");
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) < 0) {
      newArr.push(arr[i])
    }
  }
  let r = newArr.filter(function (s) {
    return s && s.trim();
  });
  let res;
  for (let i = 0; i < r.length; i++) {
    if (r[i] === "undefined") {
      r.splice(i, 1)
    }
  }
  for (let i = 0; i < r.length; i++) {
    if (i === 0) {
      res = "/" + r[i];
    } else {
      res = res + "/" + r[i];
    }
  }
  // res = res + "/";
  return res;
}

export  function  dataTreeDg(pt, tree) {
  let newRR = [];
  for (let t of tree) {
    if (pt.id === t.parentId) {
      let ct = dataTreeDg(t, tree);
      if (ct.length !== 0) {
        if (t.path.substring(0, 1) === "/") {
          t.path = pt.path + t.path;
        } else {
          t.path = pt.path + "/" + t.path;
        }
        t.path = splitPath(t.path);
        newRR.push({
          title: t.meta.title,
          key: t.id,
          path: t.path,
          value: [],
          btnPermissions: t.permissions,
          children: ct
        });
      } else {
        if (t.path.substring(0, 1) === "/") {
          t.path = pt.path + t.path;
        } else {
          t.path = pt.path + "/" + t.path;
        }
        t.path = splitPath(t.path);
        newRR.push({
          title: t.meta.title,
          key: t.id,
          value: [],
          path: t.path,
          btnPermissions: t.permissions,
        });
      }
    }
  }
  return newRR;
}