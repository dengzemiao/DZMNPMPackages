#!/usr/bin/env node
const shell=require("shelljs"),chalk=require("chalk"),program=require("commander")["program"],version=require("./package.json")["version"];function execSilentCheck(e,c){return exec(e,{silent:!0,check:!0,...c})}function execSilent(e,c){return exec(e,{silent:!0,...c})}function execCheck(e,c){return exec(e,{check:!0,...c})}function exec(e,c){var c=c||{},t=shell.exec(e,{silent:c.silent});return 0!=t.code&&c.check&&(e=c.errMsg||e+" 执行失败",c.silent&&console.log(rmEnter(t.stdout)),BgError("========================================== Error："+e),c.exitMsg&&BgError(c.exitMsg),exit(t.code)),t}function exit(e){process.exit(e)}function rmEnter(e){return(e||"").trim()}function isTure(e){return 1==e||"true"==e||"Ture"==e}const BgInfo=e=>{console.log(chalk.bgBlue.bold(e))},BgError=e=>{console.log(chalk.bgRed.bold(e))},BgSuccess=e=>{console.log(chalk.bgGreenBright.bold(e))},BgWarning=e=>{console.log(chalk.bgHex("#FFA500").bold(e))};var cb="",ctime=nowDate(),lbs=[],rbs=[],isrb=!1;const fbPrefix="ggit-fix-";function initData(){execSilentCheck("git -v",{errMsg:"请检查 Git 是否安装！"}),cb=execSilentCheck("git branch",{errMsg:"请检查当前项目是否支持了 Git 仓库！"}).stdout.match(/(?<=\* ).*/g)[0],(lbs=execSilentCheck("git branch").stdout.match(/(?<=  ).*?(?=[ |\n])/g)||[]).push(cb),rbs=execSilentCheck("git branch -r").stdout.match(/(?<=\/).*?(?=[ |\n])/g)||[],isrb=rbs.includes(cb),delFixBranch(rbs)}function nowDate(){var e=new Date,c=e.getFullYear(),t=e.getMonth()+1,i=e.getDate(),n=e.getHours(),o=e.getMinutes(),e=e.getSeconds();return c+`-${t=1<=t&&t<=9?"0"+t:t}-${i=0<=i&&i<=9?"0"+i:i} ${n=0<=n&&n<=9?"0"+n:n}:${o=0<=o&&o<=9?"0"+o:o}:`+(e=0<=e&&e<=9?"0"+e:e)}function pushCurrentBranch(e){BgWarning("==== 注意：如果当前工程使用了第三方提交插件(例：cz 等)，会拦截命令导致无法提交，请直接使用第三方插件提交！ ");var c,t=!1,i=!1;isTure(e.stash)&&(BgWarning("==== 注意：使用 stash 暂存代码，如果手动终止了命令，需使用 $ git pop 释放出暂存区代码，以免丢失！"),BgInfo("========================================== git stash"),(c=exec("git stash").stdout).includes("没有要保存的本地修改")||c.includes("No local changes to save")||(t=!0),c.includes("needs merge")&&(i=!0),t)&&(BgInfo("========================================== git pull origin "+cb),execCheck("git pull origin "+cb),BgInfo("========================================== git stash pop"),execCheck("git stash pop")),BgInfo("========================================== git add ."),exec("git add ."),BgInfo(`========================================== git commit -m "${e.message}"`),exec(`git commit -m "${e.message}"`),!isrb||t||i||e.fix||(BgInfo("========================================== git pull origin "+cb),execCheck("git pull origin "+cb)),BgInfo("========================================== git push origin "+cb),execCheck("git push origin "+cb)}function mergeToBranch(e){var c=e.go,e=e.to;cb!=e?(BgInfo("========================================== git checkout "+e),execCheck("git checkout "+e),rbs.includes(e)&&(BgInfo("========================================== git pull origin "+e),execCheck("git pull origin "+e)),BgInfo("========================================== git merge "+cb),execCheck("git merge "+cb),BgInfo("========================================== git push origin "+e),execCheck("git push origin "+e),BgInfo("========================================== git checkout "+c),execCheck("git checkout "+c)):c&&(BgInfo("========================================== git checkout "+c),execCheck("git checkout "+c))}function fixBranch(e){var c;isrb?(c=""+fbPrefix+cb,BgInfo("========================================== git checkout -b "+c),execCheck("git checkout -b "+c),BgInfo("========================================== git branch -D "+cb),execCheck("git branch -D "+cb),BgInfo(`========================================== git checkout origin/${cb} -b `+cb),execCheck("git checkout "+cb),BgInfo("========================================== git pull origin "+cb),execCheck("git pull origin "+cb),BgInfo("========================================== git merge "+c),execCheck("git merge "+c),delFixBranch(rbs,!0),isTure(e.push)&&(e.fix=!0,pushCurrentBranch(e))):(BgError(`========================================== Error：${cb} 不存在远程分支，无法进行修复！`),exit(1))}function delFixBranch(e,c){var t=""+fbPrefix+cb;(lbs.includes(t)&&!e.includes(t)||c)&&(BgInfo("========================================== git branch -D "+t),execCheck("git branch -D "+t))}program.command("push").description("提交当前分支到远程仓库，并可在提交完成后，自动切换到指定分支").option("-g, --go [branch]","合并提交结束后，切换到指定分支").option("-s, --stash [type]","使用 stash 暂存区方式合并代码，如果手动终止了脚本，需要使用 $ git pop 放出暂存区的代码，以免丢失",!0).option("-m, --message [msg]","提交日志信息",ctime+" 提交优化").action(e=>{var c=e.go;BgSuccess("========================================== 开始提交 =========================================="),initData(),pushCurrentBranch(e),c&&(BgInfo("========================================== git checkout "+c),execCheck("git checkout "+c)),BgSuccess("========================================== 提交结束 ==========================================")}),program.command("merge").description("提交当前分支到远程仓库，并合并到指定分支，再返回当前分支/指定分支").option("-t, --to [branch]","合并到指定的分支","dev").option("-g, --go [branch]","合并提交结束后，切换到指定分支",cb).option("-s, --stash","使用 stash 暂存区方式合并代码，如果手动终止了脚本，需要使用 $ git pop 放出暂存区的代码，以免丢失",!0).option("-m, --message [msg]","提交日志信息",ctime+" 提交优化").action(e=>{BgSuccess("========================================== 开始合并 =========================================="),initData(),pushCurrentBranch(e),mergeToBranch(e),BgSuccess("========================================== 合并结束 ==========================================")}),program.command("fix").description("目前主要作用于修复分支偏移问题").option("-p, --push [type]","修复完成后，将代码提交到远程分支",!0).option("-g, --go [branch]","合并提交结束后，切换到指定分支").option("-m, --message [msg]","提交日志信息",ctime+" 修复分支偏移").action(e=>{BgSuccess("========================================== 开始修复 =========================================="),initData(),fixBranch(e),BgSuccess("========================================== 修复结束 ==========================================")}),program.option("-v","output the version number").action(()=>{console.log(version)}).version(version).parse(process.argv);