/* ---------- WRAPPERS ---------- */
ensureAdvancedState();

const baseKpiBoost=window.getKpiTrafficBoost;
window.getKpiTrafficBoost=function(){const base=baseKpiBoost?baseKpiBoost():1;const kpiOnly=Math.max(0,base-1),mkt=isStaffActive('staffMkt')?.20:0;return 1+kpiOnly+mkt};
const baseTaxSpeed=window.getTaxSpeedBuff;
window.getStaffSpeedBuff=getStaffSpeedBuff;
window.getTotalWorkSpeedBuff=()=>Math.max(-.2,Math.min(1,(baseTaxSpeed?baseTaxSpeed():0)+getStaffSpeedBuff()));

const baseParityEnd=window.parityEndDay;
window.parityEndDay=function(rec){if(baseParityEnd)baseParityEnd(rec);ensureAdvancedState();S.kpiPeriodTotalRev=(S.kpiPeriodTotalRev||0)+(rec?recRev(rec):0);S.kpiPeriodTotalBills=(S.kpiPeriodTotalBills||0)+(rec?.served||0);if(typeof rating==='function'&&rating()>=4.95&&S._bankCapStarDayAdv!==S.day){S._bankCapStarDayAdv=S.day;S.bankSaving.cap=Math.min(1000000000,Math.round((S.bankSaving.cap||10000000)*1.10));}if(isStaffActive('staffMkt'))applyMktAutoReplies();save()};

window.paneKpi=paneKpiAdvanced;
window.openStaffKpiModal=openStaffKpiModalAdvanced;
window.paneThue=richerTaxPane;
window.getStaffTrafficBuffTotal=getStaffTrafficBuffTotal;
window.getStaffBillBonusTotal=getStaffBillBonusTotal;

const baseRenderPrep=renderPrep;
renderPrep=function(){ensureAdvancedState();baseRenderPrep();injectPartyCard();bindHeaderReview()};
const baseRefreshPrep=refreshPrep;
refreshPrep=function(board){ensureAdvancedState();baseRefreshPrep(board);injectPartyCard();bindHeaderReview()};

const baseRollDay=rollDay;
rollDay=function(day){baseRollDay(day);rollPartyContract(day)};

const baseRenderSell=renderSell;
renderSell=function(){baseRenderSell();renderAdvancedStaffBar();bindHeaderReview()};
const baseRenderPanel=renderPanel;
renderPanel=function(){baseRenderPanel();renderPartyWidget()};

const baseStaffTickAdvanced=staffTick;
staffTick=function(dt){return baseStaffTickAdvanced(dt*(1+window.getTotalWorkSpeedBuff()))};
const baseStaffOnTickAdvanced=staffOnTick;
staffOnTick=function(dt){return baseStaffOnTickAdvanced(dt*(1+window.getTotalWorkSpeedBuff()))};
const baseStaffGzTickAdvanced=staffGzTick;
staffGzTick=function(dt){return baseStaffGzTickAdvanced(dt*(1+window.getTotalWorkSpeedBuff()))};

const baseServe=serve;
serve=function(i){const before=S.served||0,money=S.money||0,fake=R.today?.fakeCount||0;baseServe(i);const n=Math.max(0,(S.served||0)-before);if(n){onCupServedProgress(n);const gain=Math.max(0,(S.money||0)-money),billBonus=getStaffBillBonusTotal();if(gain>0&&billBonus>0){const x=Math.round(gain*billBonus);S.money+=x;S.cur.gift=(S.cur.gift||0)+x}if(isTaxActive()&&gain>0&&Math.random()<(S.taxOnline.rate||0)){S.money+=gain;S.cur.gift=(S.cur.gift||0)+gain;toast('💎 Bảo hộ thuế kích hoạt x2 bill: +'+fmt(gain),2500)}if((R.today?.fakeCount||0)>fake&&isTaxActive()&&Math.random()<(S.taxOnline.rate||0)){const comp=Math.max(10000,Math.round(gain||30000));S.money+=comp;S.cur.gift=(S.cur.gift||0)+comp;toast('🛡️ Bảo hộ thuế bù rủi ro gian lận +'+fmt(comp),2500)}save();head()}};
const baseServeOnline=serveOnline;
serveOnline=function(i){const before=S.served||0,money=S.money||0;baseServeOnline(i);const n=Math.max(0,(S.served||0)-before);if(n){onCupServedProgress(n);const gain=Math.max(0,(S.money||0)-money),billBonus=getStaffBillBonusTotal();if(gain>0&&billBonus>0){const x=Math.round(gain*billBonus);S.money+=x;S.cur.gift=(S.cur.gift||0)+x}save();head()}};

const baseAddReview=addReview;
addReview=function(st,why,online,c,extra){baseAddReview(st,why,online,c,extra);if(isStaffActive('staffMkt')){const r=S.reviews[0];if(r&&!r.rp){r.rp=r.s<=2?'Quán đã ghi nhận và sẽ rà soát lại quy trình ngay. Cảm ơn bạn đã góp ý.':'Cảm ơn bạn đã ủng hộ Tiệm Trà Nhỏ. Hẹn gặp lại bạn sớm!';if(r.s<5&&Math.random()<.45)r.s++;save()}}};

const baseTryOpen=tryOpen;
tryOpen=function(){checkMktAutoPayTax();checkEquipBreakdown();checkStaffExcuses(()=>baseTryOpen())};

const baseStartDay=startDay;
startDay=function(){R.staffBuyerTrip=null;R.buyerTrips=0;R.svStealPending=null;R.svNightRolled=false;baseStartDay();renderAdvancedStaffBar()};

const baseTick=tick;
tick=function(){baseTick();if(!R.running)return;staffBuyerTick();staffSvTick();if((R.tk||0)%10===0)renderAdvancedStaffBar()};

const baseEndDay=endDay;
endDay=function(){settlePartyBeforeEnd();const restore=(R.staffExcusedRestore||[]).slice();baseEndDay();restore.forEach(id=>{if(S.hired&&S.hired[id])S.upg[id]=true});if(restore.length){R.staffExcusedRestore=[];save()}};

/* lightweight compatibility names used by the newer reference feature families */
function renderGzHeadCup(){return null}
function renderCupHint(){renderPartyWidget()}
function isPriorityStaffWorking(){return getActiveStaffList().some(u=>['staffGz','staff2','staffSv'].includes(u.id))}
function clearStaffPouring(){if(R)R.staffPouring=false}
function gzWeatherComplain(){if(S.upg.staffGz&&(evIs('rain')||evIs('hot')))toast('🧑‍💼 Gen Z: Hôm nay thời tiết khó chiều ghê sếp ơi!')}
function onGzWidgetClick(){if(typeof gzTriggerSulk==='function'&&R.gzSulking)toast('Hãy động viên nhân viên Gen Z để quay lại làm việc.')}
function gzFalseCatchAccusation(){toast('Không phát hiện hành vi đá bill lúc này.')}
function gzQuitFromSulk(){if(S.upg.staffGz){S.upg.staffGz=false;save();toast('Nhân viên Gen Z đã xin nghỉ.')}}
function gzQuitFromSpamCatch(){gzQuitFromSulk()}
function catchGenZ(){onGzWidgetClick()}
function finishEndDay(){settlePartyBeforeEnd()}

Object.assign(window,{AP_VERSION,rollPartyContract,partyContractCard,acceptPartyContract,rejectPartyContract,getActiveStaffList,staffDramaCheck,getStaffTrafficBuffTotal,checkMktAutoPayTax,checkReset5StarRating,triggerFriendBadReview,getStaffSpeedBuff,getStaffBillBonusTotal,staffPersonName,staffFullName,genStaffAvatar,staffAvatarUrl,staffAvatarImg,applyMktAutoReplies,openSellReviewsModal,openReviews,openSellModal,hireOrCallStaff,fireStaff,isStaffActive,checkEquipBreakdown,checkStaffExcuses,renderGzHeadCup,renderCupHint,isPriorityStaffWorking,clearStaffPouring,gzWeatherComplain,onGzWidgetClick,gzFalseCatchAccusation,gzQuitFromSulk,gzQuitFromSpamCatch,catchGenZ,getBuyerBatch,findDepletedIngredient,staffBuyerStartTrip,staffBuyerCompleteTrip,staffBuyerTriggerInstant,staffBuyerTick,renderBuyerWidget,openBuyerDispatchModal,onBuyerWidgetClick,svTriggerStealIntent,svCheer,svStealFail,onSvWidgetClick,renderSvWidget,staffSvTick,staffSvStep,renderPartyWidget,packCupForParty,onCupServedProgress,finishEndDay,updateKarinPatrol,animLoop});

requestAnimationFrame(animLoop);
setTimeout(()=>{ensurePartyForToday();renderPrep()},0);
