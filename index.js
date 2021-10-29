const { readdirSync, rename, lstatSync } = require("fs");

let suffix = "Color";

function renameAllFileInFolder(path) {
  const files = readdirSync(path);
  files.forEach(function (file) {
    if (lstatSync(path + "/" + file).isDirectory()) {
      renameAllFileInFolder(path + "/" + file);
    } else {
      let file2 = file.replace(/_/g, "");
      file2 = file2.replace(/&/g, "");
      file2 = file2.replace(/_/g, "");
      let newName1 = replaceFor(file2);
      let newName = newName1.charAt(0).toLocaleLowerCase() + newName1.slice(1);
      if (!newName.includes("@") && !file2.startsWith(".")) {
        let varName = newName.replace(suffix, "").replace(".pdf", "");
        let imageName = newName.replace(".pdf", "");
        console.log(
          `public static let ${varName} = UIImage.initialize(apolloName: "${imageName}")`
        );
      }
      rename(path + `/${file}`, `${path}/${newName}`, (err) => {
        if (err) console.log(err);
      });
    }
  });
}

function replaceFor(str) {
  str = str.charAt(0).toLowerCase() + str.slice(1);
  let newName = "";
  let needToAddUpper = true;
  let addedSuffix = false;
  for (let char of str) {
    if ((char === "@" || char === ".") && !addedSuffix) {
      newName += suffix + char;
      addedSuffix = true;
    } else {
      if (char !== "-" && char !== " ") {
        if (needToAddUpper) {
          newName += char.toUpperCase();
          needToAddUpper = false;
        } else {
          newName += char;
        }
      } else {
        needToAddUpper = true;
        continue;
      }
    }
  }
  return newName;
}

let directoryPath = "/Users/hlv/Downloads/c";
// if (!existsSync(directoryPath + "_")) {
//   mkdirSync(directoryPath + "_");
// }
renameAllFileInFolder(directoryPath);
