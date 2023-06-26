#!/usr/bin/env node
const shell=require("shelljs"),chalk=require("chalk"),fs=require("fs"),path=require("path"),config=require("./config.json"),program=require("commander")["program"],version=require("./package.json")["version"];function execSilentCheck(e,n){return exec(e,{silent:!0,check:!0,...n})}function execSilent(e,n){return exec(e,{silent:!0,...n})}function execCheck(e,n){return exec(e,{check:!0,...n})}function exec(e,n){var n=n||{},c=shell.exec(e,{silent:n.silent});return 0!=c.code&&n.check&&(n.silent&&console.log(rmEnter(c.stdout)),showError(e,n.errMsg),n.exitMsg&&BgError(n.exitMsg),void 0!==n.exit&&!0!==n.exit||exit(c.code)),c}function exit(e){process.exit(e)}function showError(e,n){n=n||e+" 执行失败";BgError("========================================== Error："+n)}function rmEnter(e){return(e||"").trim()}function isTure(e){return 1==e||!0===e||"true"==e||"Ture"==e}const BgInfo=e=>{console.log(chalk.bgBlue.bold(e))},BgError=e=>{console.log(chalk.bgRed.bold(e))},BgSuccess=e=>{console.log(chalk.bgGreenBright.bold(e))},BgWarning=e=>{console.log(chalk.bgHex("#FFA500").bold(e))};var cb=(execSilent("git branch").stdout.match(/(?<=\* ).*/g)||[])[0],ctime=nowDate(),lbs=[],rbs=[],isrb=!1;const fbPrefix="ggit-fix-",configPath=path.join(__dirname,"config.json");function initData(){execSilentCheck("git --version",{errMsg:"请检查 Git 是否安装！"}),execSilentCheck("git branch",{errMsg:"请检查当前项目是否支持了 Git 仓库！"}),execSilent("get fetch"),(lbs=execSilentCheck("git branch").stdout.match(/(?<=  ).*?(?=[ |\n])/g)||[]).push(cb),rbs=execSilentCheck("git branch -r").stdout.match(/(?<=\/).*?(?=[ |\n])/g)||[],isrb=rbs.includes(cb),delFixBranch(rbs)}function nowDate(){var e=new Date,n=e.getFullYear(),c=e.getMonth()+1,o=e.getDate(),t=e.getHours(),r=e.getMinutes(),e=e.getSeconds();return n+`-${c=1<=c&&c<=9?"0"+c:c}-${o=0<=o&&o<=9?"0"+o:o} ${t=0<=t&&t<=9?"0"+t:t}:${r=0<=r&&r<=9?"0"+r:r}:`+(e=0<=e&&e<=9?"0"+e:e)}function pushCurrentBranch(e){BgWarning("==== 注意：如果当前工程使用了第三方提交插件(例：cz 等)，会拦截命令导致无法提交，请直接使用第三方插件提交！ ");var n,c=!1,o=!1;isTure(e.stash)&&isrb&&(BgWarning("==== 注意：使用 stash 暂存代码，在有保存本地内容的情况下，如手动终止脚本、执行失败停止脚本，需检查是否执行了 $ git stash pop 命令，没有执行需要手动执行放出暂存区的代码，以免丢失！"),BgInfo("========================================== git stash"),((n=exec("git stash").stdout).includes("保存工作目录和索引状态")||n.includes("Saved working directory and index state"))&&(c=!0),n.includes("needs merge")&&(o=!0),c)&&pullBranch(cb,()=>{BgInfo("========================================== git stash pop"),execCheck("git stash pop")}),BgInfo("========================================== git add ."),exec("git add ."),BgInfo(`========================================== git commit -m "${e.message}"`),exec(`git commit -m "${e.message}"`),!isrb||c||o||e.fix||pullBranch(cb),BgInfo("========================================== git push origin "+cb),execCheck("git push origin "+cb)}function mergeToBranch(e){var n=e.go,e=e.to;cb!=e?(goBranch(e),pullBranch(e),BgInfo("========================================== git merge "+cb),execCheck("git merge "+cb),BgInfo("========================================== git push origin "+e),execCheck("git push origin "+e),goBranch(n)):n&&goBranch(n)}function pullBranch(e,n){BgInfo("========================================== git pull origin "+e);var e="git pull origin "+e,c=exec(e);0==c.code||c.stderr.includes("无法找到远程引用")||c.stderr.includes("couldn't find remote ref")?n&&n(c):(showError(e),n&&n(c),exit(c.code))}function fixBranch(e){var n;isrb?(newBranch(n=""+fbPrefix+cb),delBranch(cb),goBranch(cb),pullBranch(cb),BgInfo("========================================== git merge "+n),execCheck("git merge "+n),delFixBranch(rbs,!0),isTure(e.push)&&(e.fix=!0,pushCurrentBranch(e))):(BgError(`========================================== Error：${cb} 不存在远程分支，无法进行修复！`),exit(1))}function delFixBranch(e,n){var c=""+fbPrefix+cb;(lbs.includes(c)&&!e.includes(c)||n)&&delBranch(c)}function delBranch(e,n){n?(BgInfo("========================================== git push origin -d "+e),execCheck("git push origin -d "+e)):(BgInfo("========================================== git branch -D "+e),execCheck("git branch -D "+e))}function newBranch(e){BgInfo("========================================== git checkout -b "+e),execCheck("git checkout -b "+e)}function goBranch(e){BgInfo("========================================== git checkout "+e),execCheck("git checkout "+e)}function execArgs(e){e&&e.length&&(e="git "+e.join(" "),BgInfo("========================================== "+e),exec(e))}program.command("pull").description("同步当前分支的远程数据，如果未建立远程分支跟踪，会自动跟踪远程分支，并拉取最新数据").action(e=>{e.go;BgSuccess("========================================== 开始拉取 =========================================="),initData(),execSilent(`git branch --set-upstream-to=origin/${cb} `+cb),pullBranch(cb),BgSuccess("========================================== 拉取结束 ==========================================")}),program.command("push").description("提交当前分支到远程仓库，并可在提交完成后，自动切换到指定分支").option("-g, --go [branch]","合并提交结束后，切换到指定分支").option("-s, --stash [type]","使用 stash 暂存区方式合并代码，如手动终止脚本、执行失败停止脚本，需检查是否执行了 $ git stash pop 命令，没有执行需要手动执行放出暂存区的代码，以免丢失",config.stash).option("-m, --message [msg]","提交日志信息",ctime+" 提交优化").action(e=>{var n=e.go;BgSuccess("========================================== 开始提交 =========================================="),initData(),pushCurrentBranch(e),n&&goBranch(n),BgSuccess("========================================== 提交结束 ==========================================")}),program.command("merge").description("提交当前分支到远程仓库，并合并到指定分支，再返回当前分支/指定分支").option("-t, --to [branch]","合并到指定的分支",config.to).option("-g, --go [branch]","合并提交结束后，切换到指定分支",cb).option("-s, --stash [type]","使用 stash 暂存区方式合并代码，如手动终止脚本、执行失败停止脚本，需检查是否执行了 $ git stash pop 命令，没有执行需要手动执行放出暂存区的代码，以免丢失",config.stash).option("-m, --message [msg]","提交日志信息"," 提交优化").action(e=>{BgSuccess("========================================== 开始合并 =========================================="),initData(),pushCurrentBranch(e),mergeToBranch(e),BgSuccess("========================================== 合并结束 ==========================================")}),program.command("fix").description("目前主要作用于修复分支偏移问题").option("-p, --push [type]","修复完成后，将代码提交到远程分支",!0).option("-g, --go [branch]","合并提交结束后，切换到指定分支").option("-m, --message [msg]","提交日志信息",ctime+" 修复分支偏移").action(e=>{BgSuccess("========================================== 开始修复 =========================================="),initData(),fixBranch(e),BgSuccess("========================================== 修复结束 ==========================================")}),program.command("config").description("修改/查看默认配置").option("set","修改默认配置").option("get","查看默认配置").option("-t, --to [branch]","合并到指定的分支").option("-s, --stash [type]","是否使用 stash 暂存区合并状态").action((n,e)=>{if(e.args.includes("set")){e=Object.keys(n||{});e.length?e.forEach(e=>{config[e]=n[e]}):(console.log("缺少需要配置的参数"),exit(1));const c=JSON.stringify(config,null,"\t");fs.writeFile(configPath,c,"utf8",e=>{e?console.log("修改失败"):(console.log(c),console.log("Set Success!"))})}else{var e=Object.keys(n||{});e.length?e.forEach(e=>{console.log(config[e])}):(e=JSON.stringify(config,null,"\t"),console.log(e))}}),program.version(version).option("-v","output the version number").option("-d [branch]","移除指定本地分支").option("-dr [branch]","移除指定远程分支").option("-b [branch]","以当前分支为基础，新建分支").option("-g [branch]","切换到指定分支，如本地没有会拉取远程分支").action((e,n)=>{e.v?console.log(version):e.g?goBranch(e.g):e.b?newBranch(e.b):e.d?delBranch(e.d):e.Dr?delBranch(e.Dr,!0):execArgs(n.args)}).parse(process.argv);