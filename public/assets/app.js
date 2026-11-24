{
const $=s=>document.querySelector(s);
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=(n=10)=>{const a='abcdefghijkmnpqrstuvwxyz23456789';let s='';for(const x of crypto.getRandomValues(new Uint8Array(n)))s+=a[x%a.length];return s};
const today=()=>new Date().toISOString().slice(0,10);

const T={
it:{tagline:'Dividete le spese. Senza account, senza confusione.',sub:'Crea un gruppo, invita gli amici e Splitto vi dice chi deve quanto a chi.',newGroup:'Nuovo gruppo',gName:'Nome del gruppo',gNamePh:'Es. Weekend a Napoli',currency:'Valuta del gruppo',people:'Persone',personPh:'Nome',add:'Aggiungi',create:'Crea gruppo',need2:'Servono un nome e almeno 2 persone.',quick:'Conto veloce',quickSub:'Una cena da dividere al volo, senza creare un gruppo.',openQuick:'Apri il conto veloce',openCode:'Hai un codice gruppo?',codePh:'Codice gruppo',open:'Apri',recent:'I tuoi gruppi',sample:'Esempio di come appare un gruppo',
who:'Chi deve a chi',even:'Siete pari. Nessuno deve niente.',noExp:'Nessuna spesa ancora. Aggiungi la prima e Splitto fa i conti.',addExp:'Aggiungi spesa',export:'Esporta PDF',copySum:'Copia riepilogo',total:'Totale speso',nExp:'Spese',perHead:'Media a testa',balances:'Saldi',gets:'riceve',pays:'deve',settled:'pari',cats:'Per categoria',expenses:'Spese',paidBy:'pagata da',payments:'Pagamenti registrati',gave:'ha dato',undo:'Annulla',del:'Elimina',sure:'Tocca di nuovo per eliminare',
share:'Invita',shareT:'Invita il gruppo',shareP1:'Chi ha questo link vede il gruppo e può aggiungere spese, senza account e senza app.',shareP2:'Mandalo solo alle persone del gruppo.',copy:'Copia link',wa:'WhatsApp',shareBtn:'Condividi',copied:'Copiato',close:'Chiudi',
synced:'Sincronizzato',offline:'Connessione assente: le modifiche potrebbero non essere salvate.',full:'Il gruppo ha raggiunto il numero massimo di spese.',loading:'Caricamento del gruppo…',slow:'Il server non risponde: i dati potrebbero non essere aggiornati.',notFound:'Gruppo non trovato. Controlla il codice.',saveErr:'Salvataggio non riuscito. Riprova.',
desc:'Descrizione',descPh:'Es. Cena da Gino',amount:'Importo',rate:'Cambio',rateNote:'Tasso indicativo, non in tempo reale: correggilo con quello della tua banca.',payer:'Chi ha pagato',cat:'Categoria',split:'Come dividere',equal:'Uguale',sharesM:'A quote',exact:'Importi',date:'Data',save:'Salva spesa',cancel:'Annulla',left:'Da assegnare',errAmt:'Inserisci una descrizione e un importo valido.',errSplit:'Scegli almeno una persona.',errExact:'Gli importi devono sommare al totale.',sharesHint:'Es. 2 = paga il doppio di chi ha 1.',
catN:{food:'Cibo',stay:'Alloggio',travel:'Trasporti',shop:'Spesa',fun:'Svago',bills:'Bollette',other:'Altro'},
premT:'Splitto Premium',premSub:'Per chi divide spesso.',f1:'Nessuna pubblicità',f2:'Esportazioni PDF illimitate (gratis: 3 al giorno)',f3:'Sostieni lo sviluppo di Splitto',price:'1,99 € / mese',activate:'Attiva Premium',demoNote:'Prototipo: il pagamento è simulato, non verrà addebitato nulla.',active:'Premium è attivo.',deactivate:'Disattiva (demo)',limitHit:'Hai usato i 3 PDF gratuiti di oggi.',pdfLeft:'PDF gratuiti rimasti oggi: {n} di 3',
ad:'Pubblicità',adSlot:'Spazio pubblicitario',adRemove:'Rimuovi con Premium',bill:'Totale del conto',nPeople:'Quante persone',tip:'Mancia',each:'Ognuno paga',none:'Nessuna',
pdfSaved:'PDF salvato',pdfFail:'Non è stato possibile salvare il PDF qui.',pdfLib:'Il generatore PDF non si è caricato. Ricarica la pagina.',sumCopied:'Riepilogo copiato',copyFail:'Copia non riuscita',
proto:'Splitto · I tassi di cambio sono indicativi: controllali con la tua banca.',madeWith:'Fatto con Splitto',navPrivacy:'Privacy',navAbout:'Chi siamo',navTrip:'Spese di viaggio',navRoom:'Spese tra coinquilini',navDinner:'Conto al ristorante',paidOk:'Pagamento registrato',addOk:'Spesa salvata',
meQ:'Chi sei?',meNone:'Scegli il tuo nome',you:'Tu',youOwe:'Devi in totale',youGet:'Ti devono in totale',youEven:'Sei in pari',
dOther:(a,b)=>`<b>${a}</b> deve a <b>${b}</b>`,dMeFrom:b=>`<b>Devi</b> a <b>${b}</b>`,dMeTo:a=>`<b>${a}</b> ti deve`,
markPaid:'Registra pagamento',payT:'Registra pagamento',payAmt:'Importo pagato',payNote:'Puoi registrare anche solo una parte: il resto rimane da pagare.',payErr:'Inserisci un importo valido.',payPal:'Paga con PayPal',copyIban:'Copia IBAN',copySat:'Copia n. Satispay',ibanCopied:'IBAN copiato',
edit:'Modifica',editExp:'Modifica spesa',manage:'Gestisci persone',membersT:'Persone del gruppo',memName:'Nome',iban:'IBAN (per ricevere bonifici)',paypal:'Username PayPal.me',satispay:'Numero Satispay',remove:'Rimuovi dal gruppo',cantRemove:'Non puoi rimuovere chi compare in una spesa o in un pagamento.',saveMem:'Salva modifiche',memSaved:'Persone aggiornate',addPerson:'Aggiungi persona',nameEmpty:'Ogni persona deve avere un nome.',
newBadge:'Nuova',newSince:n=>`${n} ${n===1?'novità':'novità'} dall’ultima visita, segnate come “Nuova”.`},
en:{tagline:'Split expenses. No accounts, no confusion.',sub:'Create a group, invite your friends and Splitto tells you who owes whom.',newGroup:'New group',gName:'Group name',gNamePh:'e.g. Weekend in Naples',currency:'Group currency',people:'People',personPh:'Name',add:'Add',create:'Create group',need2:'You need a name and at least 2 people.',quick:'Quick split',quickSub:'One bill to split on the spot, no group needed.',openQuick:'Open quick split',openCode:'Got a group code?',codePh:'Group code',open:'Open',recent:'Your groups',sample:'Example of how a group looks',
who:'Who owes whom',even:'You are all square. Nobody owes anything.',noExp:'No expenses yet. Add the first and Splitto does the maths.',addExp:'Add expense',export:'Export PDF',copySum:'Copy summary',total:'Total spent',nExp:'Expenses',perHead:'Average each',balances:'Balances',gets:'gets back',pays:'owes',settled:'square',cats:'By category',expenses:'Expenses',paidBy:'paid by',payments:'Recorded payments',gave:'gave',undo:'Undo',del:'Delete',sure:'Tap again to delete',
share:'Invite',shareT:'Invite the group',shareP1:'Anyone with this link can see the group and add expenses, with no account and no app.',shareP2:'Only send it to people in the group.',copy:'Copy link',wa:'WhatsApp',shareBtn:'Share',copied:'Copied',close:'Close',
synced:'Synced',offline:'No connection: changes may not be saved.',full:'This group has reached the maximum number of expenses.',loading:'Loading the group…',slow:'The server is not answering: the data may be out of date.',notFound:'Group not found. Check the code.',saveErr:'Saving failed. Try again.',
desc:'Description',descPh:'e.g. Dinner at Gino’s',amount:'Amount',rate:'Rate',rateNote:'Indicative rate, not live: correct it with your bank’s rate.',payer:'Who paid',cat:'Category',split:'How to split',equal:'Equal',sharesM:'Shares',exact:'Amounts',date:'Date',save:'Save expense',cancel:'Cancel',left:'Left to assign',errAmt:'Enter a description and a valid amount.',errSplit:'Pick at least one person.',errExact:'The amounts must add up to the total.',sharesHint:'e.g. 2 = pays double someone with 1.',
catN:{food:'Food',stay:'Stay',travel:'Transport',shop:'Groceries',fun:'Fun',bills:'Bills',other:'Other'},
premT:'Splitto Premium',premSub:'For people who split often.',f1:'No ads',f2:'Unlimited PDF exports (free: 3 a day)',f3:'Support Splitto’s development',price:'€1.99 / month',activate:'Go Premium',demoNote:'Prototype: payment is simulated, nothing will be charged.',active:'Premium is active.',deactivate:'Turn off (demo)',limitHit:'You have used today’s 3 free PDFs.',pdfLeft:'Free PDFs left today: {n} of 3',
ad:'Advertisement',adSlot:'Ad space',adRemove:'Remove with Premium',bill:'Bill total',nPeople:'How many people',tip:'Tip',each:'Each pays',none:'None',
pdfSaved:'PDF saved',pdfFail:'The PDF could not be saved here.',pdfLib:'The PDF generator did not load. Reload the page.',sumCopied:'Summary copied',copyFail:'Copy failed',
proto:'Splitto · Exchange rates are indicative: check them with your bank.',madeWith:'Made with Splitto',navPrivacy:'Privacy',navAbout:'About',navTrip:'Trip expenses',navRoom:'Splitting rent',navDinner:'Restaurant bill',paidOk:'Payment recorded',addOk:'Expense saved',
meQ:'Who are you?',meNone:'Pick your name',you:'You',youOwe:'You owe in total',youGet:'You are owed in total',youEven:'You are square',
dOther:(a,b)=>`<b>${a}</b> owes <b>${b}</b>`,dMeFrom:b=>`<b>You owe</b> <b>${b}</b>`,dMeTo:a=>`<b>${a}</b> owes you`,
markPaid:'Record payment',payT:'Record payment',payAmt:'Amount paid',payNote:'You can record just part of it: the rest stays owed.',payErr:'Enter a valid amount.',payPal:'Pay with PayPal',copyIban:'Copy IBAN',copySat:'Copy Satispay no.',ibanCopied:'IBAN copied',
edit:'Edit',editExp:'Edit expense',manage:'Manage people',membersT:'People in the group',memName:'Name',iban:'IBAN (to receive transfers)',paypal:'PayPal.me username',satispay:'Satispay number',remove:'Remove from group',cantRemove:'You cannot remove someone who appears in an expense or payment.',saveMem:'Save changes',memSaved:'People updated',addPerson:'Add person',nameEmpty:'Everyone needs a name.',
newBadge:'New',newSince:n=>`${n} new since your last visit, marked “New”.`}};
let lang=LS.get('splitto:lang',(navigator.language||'it').toLowerCase().startsWith('it')?'it':'en');
const t=k=>T[lang][k]??k;
const loc=()=>lang==='it'?'it-IT':'en-GB';
const money=(v,c)=>{try{return new Intl.NumberFormat(loc(),{style:'currency',currency:c}).format(v)}catch(e){return (+v).toFixed(2)+' '+c}};
const CUR={EUR:1,USD:.86,GBP:1.14,CHF:1.07,JPY:.0057,CAD:.62,AUD:.57,SEK:.091,NOK:.085,DKK:.134,PLN:.235,CZK:.041,HUF:.0025,TRY:.021,KRW:.00062,THB:.026,MXN:.047,BRL:.16};
const rateOf=(c,b)=>(CUR[c]||1)/(CUR[b]||1);
const CATS=['food','stay','travel','shop','fun','bills','other'];
const num=v=>{const n=parseFloat(String(v).replace(/\s/g,'').replace(',','.'));return isFinite(n)?n:0};
const fmtDate=d=>{if(!d)return'';const x=new Date(d+'T12:00:00');return isNaN(x)?d:x.toLocaleDateString(loc(),{day:'numeric',month:'short',year:x.getFullYear()!==new Date().getFullYear()?'numeric':undefined})};

/* switch these on when AdSense and Stripe are set up */
const CONFIG={ads:false,premium:false};
let P=Object.assign({premium:false,pdf:{d:'',n:0},recent:[]},LS.get('splitto:profile',{}));
const pdfState=()=>P.pdf&&P.pdf.d===today()?P.pdf:{d:today(),n:0};
const saveProf=()=>LS.set('splitto:profile',P);
const premium=()=>CONFIG.premium&&!!P.premium;
const pdfLimited=()=>CONFIG.premium&&!premium();

const toastEl=$('#toast');let tt;
function toast(m){toastEl.textContent=m;toastEl.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toastEl.classList.remove('show'),2600)}

/* sheet */
const sheet=$('#sheet'),box=$('#sheetBox');
function openSheet(html){box.innerHTML=html;sheet.classList.add('open');const f=box.querySelector('input,select,button');if(f)f.focus()}
function closeSheet(){if(!sheet.classList.contains('open'))return;sheet.classList.remove('open');box.innerHTML='';if(G&&G.pending)render()}
sheet.addEventListener('click',e=>{if(e.target===sheet)closeSheet()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet()});

/* ---------- group store (server API) ---------- */
let G=null,pollTimer=null;const mineIds=new Set();
function closeGroup(){clearInterval(pollTimer);pollTimer=null;G=null}
function remember(id,name){if(P.recent[0]&&P.recent[0].id===id&&P.recent[0].name===name)return;P.recent=[{id,name},...(P.recent||[]).filter(x=>x.id!==id)].slice(0,20);saveProf()}
const api=(path,opt)=>fetch('/api/'+path,Object.assign({headers:{'content-type':'application/json'}},opt));
async function load(){
  const g=G;if(!g)return;
  try{
    const r=await api(`groups/${g.id}${g.v?'?v='+g.v:''}`);if(G!==g)return;
    if(r.status===204){if(g.slow){g.slow=false;render()}return}
    if(r.status===404){g.loaded=true;g.notFound=true;render();return}
    if(!r.ok)throw new Error(r.status);
    const d=await r.json();if(G!==g)return;
    Object.assign(g,{meta:d.meta,exp:d.exp||{},pay:d.pay||{},v:d.v,loaded:true,slow:false});
    remember(g.id,g.meta.name);render();
  }catch(e){if(G===g){g.slow=true;if(!g.loaded){g.loaded=true;g.err=true}render()}}
}
function openGroup(id){
  closeGroup();
  G={id,meta:null,exp:{},pay:{},v:0,loaded:false,me:LS.get('splitto:me:'+id,''),seen:LS.get('splitto:seen:'+id,0)};
  LS.set('splitto:seen:'+id,Date.now());render();load();
  pollTimer=setInterval(()=>{if(document.visibilityState==='visible')load()},4000);
}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&G)load()});
async function send(path,method,body){
  try{const r=await api(path,{method,body:body?JSON.stringify(body):undefined});
    if(r.ok)return true;
    const e=await r.json().catch(()=>({}));toast(e.error==='group_full'?t('full'):t('saveErr'));return false}
  catch(e){toast(t('offline'));return false}
}
const coll=k=>k==='exp'?'expenses':'payments';
async function putItem(kind,id,obj){
  mineIds.add(id);const g=G,prev=g[kind][id];
  g[kind]={...g[kind],[id]:obj};render();
  const ok=await send(`groups/${g.id}/${coll(kind)}/${id}`,'PUT',obj);
  if(!ok&&G===g){const o={...g[kind]};if(prev)o[id]=prev;else delete o[id];g[kind]=o;render()}
  return ok;
}
async function delItem(kind,id){
  const g=G,prev=g[kind][id];const o={...g[kind]};delete o[id];g[kind]=o;render();
  if(!await send(`groups/${g.id}/${coll(kind)}/${id}`,'DELETE')&&G===g&&prev){g[kind]={...g[kind],[id]:prev};render()}
}
async function setMembers(members){
  const g=G,meta={...g.meta,members};
  const ok=await send(`groups/${g.id}/meta`,'PUT',meta);
  if(ok&&G===g){g.meta=meta;render()}
  return ok;
}
async function createGroup(meta){
  try{const r=await api('groups',{method:'POST',body:JSON.stringify({meta})});
    if(!r.ok)throw new Error(r.status);
    const{id}=await r.json();remember(id,meta.name);location.hash='g-'+id;
  }catch(e){toast(t('saveErr'))}
}
const groupUrl=id=>`${location.origin}/#g-${id}`;

/* ---------- maths ---------- */
function shareOf(e,amt,r){
  const sp=e.split||{},ids=Object.keys(sp).filter(k=>+sp[k]>0),o={};
  if(!ids.length)return o;
  if(e.mode==='exact')ids.forEach(k=>o[k]=+sp[k]*r);
  else if(e.mode==='shares'){const w=ids.reduce((a,k)=>a+ +sp[k],0);ids.forEach(k=>o[k]=amt*sp[k]/w)}
  else ids.forEach(k=>o[k]=amt/ids.length);
  return o;
}
function compute(){
  const bal={},cats={};let total=0;
  G.meta.members.forEach(m=>bal[m.id]=0);
  for(const e of Object.values(G.exp)){
    const r=+e.rate||1,amt=+e.amount*r;total+=amt;cats[e.cat]=(cats[e.cat]||0)+amt;
    if(e.payer in bal)bal[e.payer]+=amt;
    const sh=shareOf(e,amt,r);for(const k in sh)if(k in bal)bal[k]-=sh[k];
  }
  for(const p of Object.values(G.pay)){if(p.from in bal)bal[p.from]+=+p.amount;if(p.to in bal)bal[p.to]-=+p.amount}
  const deb=[],cre=[];
  for(const k in bal){const c=Math.round(bal[k]*100);if(c<0)deb.push([k,-c]);else if(c>0)cre.push([k,c])}
  deb.sort((a,b)=>b[1]-a[1]);cre.sort((a,b)=>b[1]-a[1]);
  const settle=[];let i=0,j=0;
  while(i<deb.length&&j<cre.length){const x=Math.min(deb[i][1],cre[j][1]);if(x>0)settle.push({from:deb[i][0],to:cre[j][0],amount:x/100});deb[i][1]-=x;cre[j][1]-=x;if(!deb[i][1])i++;if(!cre[j][1])j++}
  return{bal,cats,total,settle};
}
const member=id=>G.meta.members.find(x=>x.id===id);
const nameOf=id=>{const m=member(id);return m?m.name:'?'};
const used=id=>Object.values(G.exp).some(e=>e.payer===id||(e.split&&+e.split[id]>0))||Object.values(G.pay).some(p=>p.from===id||p.to===id);

/* ---------- views ---------- */
const app=$('#app');
const adHtml=()=>!CONFIG.ads||premium()?'':`<div class="ad"><span><b>${t('ad')}</b>${t('adSlot')}</span><button data-act="prem">${t('adRemove')}</button></div>`;
const cardHead=label=>`<div class="cardhead"><div class="chip"></div><span class="cardlabel">${label}</span><span class="cardmark">Splitto</span></div>`;
function debtText(d,me){
  if(me&&d.from===me)return T[lang].dMeFrom(esc(nameOf(d.to)));
  if(me&&d.to===me)return T[lang].dMeTo(esc(nameOf(d.from)));
  return T[lang].dOther(esc(d.fromN||nameOf(d.from)),esc(d.toN||nameOf(d.to)));
}
function debtRow(d,c,live,me){
  let btns='';
  if(live){
    const cr=member(d.to)||{};
    btns=`<div class="btns"><button class="btn-sm" data-pay="${esc(d.from)}|${esc(d.to)}|${d.amount}">${t('markPaid')}</button>`;
    if(cr.paypal){const u=String(cr.paypal).replace(/^@/,'').replace(/[^A-Za-z0-9._-]/g,'');if(u)btns+=`<a class="btn-sm" style="text-decoration:none;display:inline-flex;align-items:center" href="https://paypal.me/${encodeURIComponent(u)}/${d.amount.toFixed(2)}${esc(c)}">${t('payPal')}</a>`}
    if(cr.iban)btns+=`<button class="btn-sm" data-copy="${esc(cr.iban)}">${t('copyIban')}</button>`;
    if(cr.satispay)btns+=`<button class="btn-sm" data-copy="${esc(cr.satispay)}">${t('copySat')}</button>`;
    btns+='</div>';
  }
  const mine=me&&(d.from===me||d.to===me);
  return`<div class="debt${mine?' me':''}"><p>${debtText(d,me)}</p><span class="amt">${money(d.amount,c)}</span>${btns}</div>`;
}

function viewHome(){
  const rec=P.recent||[];
  const sample=[{fromN:'Marco',toN:'Giulia',amount:23},{fromN:'Luca',toN:'Giulia',amount:41.5}];
  app.innerHTML=`
  <section class="hero">
    <div><h1>${t('tagline')}</h1><p class="lead">${t('sub')}</p></div>
    <div class="card" aria-label="${t('sample')}">${cardHead(t('who'))}${sample.map(d=>debtRow(d,'EUR',false,'')).join('')}<p class="sample">${t('sample')}</p></div>
  </section>
  <div class="grid2">
    <form class="panel" id="newForm" novalidate>
      <h2>${t('newGroup')}</h2>
      <div class="field"><label for="gName">${t('gName')}</label><input id="gName" maxlength="60" placeholder="${t('gNamePh')}"></div>
      <div class="field"><label for="gCur">${t('currency')}</label><select id="gCur">${Object.keys(CUR).map(c=>`<option${c==='EUR'?' selected':''}>${c}</option>`).join('')}</select></div>
      <div class="field"><label for="pName">${t('people')}</label><div class="row"><input id="pName" maxlength="30" placeholder="${t('personPh')}" enterkeyhint="done"><button type="button" class="btn" id="pAdd">${t('add')}</button></div></div>
      <div class="chips" id="pList"></div>
      <p class="err" id="newErr"></p>
      <button class="btn primary block" type="submit">${t('create')}</button>
    </form>
    <div class="stack">
      <div class="panel"><h2>${t('quick')}</h2><p class="muted small" style="margin:-6px 0 14px">${t('quickSub')}</p><a class="btn block" href="#quick">${t('openQuick')}</a></div>
      <form class="panel" id="codeForm"><h2>${t('openCode')}</h2><div class="row"><input id="code" placeholder="${t('codePh')}" autocapitalize="off" autocomplete="off"><button class="btn" type="submit">${t('open')}</button></div></form>
      ${rec.length?`<div class="panel recent"><h2>${t('recent')}</h2>${rec.map(r=>`<a href="#g-${esc(r.id)}"><span>${esc(r.name)}</span><span class="muted">›</span></a>`).join('')}</div>`:''}
    </div>
  </div>${adHtml()}`;
  const people=[];
  const drawP=()=>{$('#pList').innerHTML=people.map((p,i)=>`<span class="tag">${esc(p)}<button type="button" aria-label="${t('del')}" data-i="${i}">×</button></span>`).join('')};
  const addP=()=>{const v=$('#pName').value.trim();if(v&&!people.includes(v)){people.push(v);drawP()}$('#pName').value='';$('#pName').focus()};
  $('#pAdd').onclick=addP;
  $('#pName').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addP()}});
  $('#pList').onclick=e=>{const b=e.target.closest('[data-i]');if(b){people.splice(+b.dataset.i,1);drawP()}};
  $('#newForm').onsubmit=e=>{e.preventDefault();const pend=$('#pName').value.trim();if(pend&&!people.includes(pend))people.push(pend);
    const name=$('#gName').value.trim();if(!name||people.length<2){drawP();$('#newErr').textContent=t('need2');return}
    createGroup({name,currency:$('#gCur').value,members:people.map(n=>({id:uid(6),name:n})),created:Date.now()})};
  $('#codeForm').onsubmit=e=>{e.preventDefault();const c=$('#code').value.trim().toLowerCase().replace(/^.*g-/,'').replace(/[^a-z0-9]/g,'');if(c)location.hash='g-'+c};
}

function viewQuick(){
  const qc=LS.get('splitto:qcur','EUR');
  app.innerHTML=`<div class="gtitle"><h1>${t('quick')}</h1></div>
  <div class="grid2"><div class="panel">
    <div class="field"><label for="qBill">${t('bill')}</label><div class="row"><input id="qBill" inputmode="decimal" placeholder="0,00"><select id="qCur" style="flex:0 0 110px">${Object.keys(CUR).map(k=>`<option${k===qc?' selected':''}>${k}</option>`).join('')}</select></div></div>
    <div class="field"><label for="qN">${t('nPeople')}</label><input id="qN" type="number" min="1" value="2" inputmode="numeric"></div>
    <label>${t('tip')}</label><div class="seg" id="qTip" style="grid-template-columns:repeat(4,minmax(0,1fr))">${[0,5,10,15].map(p=>`<button type="button" data-p="${p}" aria-pressed="${p===0}">${p?p+'%':t('none')}</button>`).join('')}</div>
  </div>
  <div class="card">${cardHead(t('each'))}<p class="big" id="qOut"></p><p class="sample" id="qDet"></p></div></div>${adHtml()}`;
  let tip=0;const calc=()=>{const cu=$('#qCur').value,b=num($('#qBill').value),n=Math.max(1,parseInt($('#qN').value)||1),tot=b*(1+tip/100);$('#qOut').textContent=money(tot/n,cu);$('#qDet').textContent=`${money(tot,cu)} · ${n} × ${money(tot/n,cu)}`};
  $('#qBill').oninput=calc;$('#qN').oninput=calc;$('#qCur').onchange=()=>{LS.set('splitto:qcur',$('#qCur').value);calc()};
  $('#qTip').onclick=e=>{const b=e.target.closest('[data-p]');if(!b)return;tip=+b.dataset.p;$('#qTip').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));calc()};
  calc();
}

function viewGroup(){
  if(!G||!G.loaded){app.innerHTML=`<p class="muted" style="padding:40px 0">${t('loading')}</p>`;return}
  if(G.notFound||G.err||!G.meta){app.innerHTML=`<div style="padding:40px 0"><p>${G.err?t('slow'):t('notFound')}</p><a class="btn" href="#">Splitto</a></div>`;return}
  /* don't wipe what someone is typing: wait until they leave the field or close the sheet */
  const ae=document.activeElement;
  if(sheet.classList.contains('open')||(ae&&app.contains(ae)&&/INPUT|SELECT|TEXTAREA/.test(ae.tagName))){G.pending=true;return}
  G.pending=false;
  const c=G.meta.currency,{bal,cats,total,settle}=compute();
  const me=member(G.me)?G.me:'';
  const exps=Object.entries(G.exp).sort((a,b)=>(b[1].date||'').localeCompare(a[1].date||'')||(b[1].ts||0)-(a[1].ts||0));
  const pays=Object.entries(G.pay).sort((a,b)=>(b[1].ts||0)-(a[1].ts||0));
  const isNew=(id,e)=>G.seen&&(e.ts||0)>G.seen&&!mineIds.has(id)&&(!me||e.addedBy!==me);
  const nNew=exps.filter(([id,e])=>isNew(id,e)).length;
  const maxB=Math.max(1,...Object.values(bal).map(Math.abs)),maxC=Math.max(1,...Object.values(cats));
  const debts=me?[...settle.filter(d=>d.from===me||d.to===me),...settle.filter(d=>d.from!==me&&d.to!==me)]:settle;
  const n=G.meta.members.length,myBal=me?Math.round(bal[me]*100)/100:0;
  app.innerHTML=`
  <div class="gtitle"><h1>${esc(G.meta.name)}</h1><span class="sync${G.slow?' local':''}">${G.slow?t('offline'):t('synced')}</span><button class="pill gold" data-act="share" style="margin-left:auto">${t('share')}</button></div>
  ${G.slow?`<p class="note">${t('slow')}</p>`:''}
  <div class="mebar"><label for="meSel">${t('meQ')}</label><select id="meSel"><option value="">${t('meNone')}</option>${G.meta.members.map(m=>`<option value="${esc(m.id)}"${m.id===me?' selected':''}>${esc(m.name)}</option>`).join('')}</select></div>
  ${nNew?`<p class="note">${T[lang].newSince(nNew)}</p>`:''}
  <div class="card">${cardHead(t('who'))}
    ${me&&exps.length?`<div class="mine"><span>${myBal<0?t('youOwe'):myBal>0?t('youGet'):t('youEven')}</span><strong class="${myBal<0?'neg':myBal>0?'pos':''}">${myBal?money(Math.abs(myBal),c):'—'}</strong></div>`:''}
    ${exps.length?(debts.length?debts.map(d=>debtRow(d,c,true,me)).join(''):`<p class="even">${t('even')}</p>`):`<p class="even">${t('noExp')}</p>`}
  </div>
  <div class="actions"><button class="btn primary" data-act="add">+ ${t('addExp')}</button><button class="btn" data-act="pdf">${t('export')}</button><button class="btn" data-act="copy">${t('copySum')}</button></div>
  ${!pdfLimited()?'':`<p class="muted small" style="margin:8px 0 0">${t('pdfLeft').replace('{n}',Math.max(0,3-pdfState().n))}</p>`}
  <div class="stats"><div class="stat"><span>${t('total')}</span><strong>${money(total,c)}</strong></div><div class="stat"><span>${t('nExp')}</span><strong>${exps.length}</strong></div><div class="stat"><span>${t('perHead')}</span><strong>${money(n?total/n:0,c)}</strong></div></div>
  <section class="panel"><h2>${t('balances')}</h2>
    ${G.meta.members.map(m=>{const v=Math.round(bal[m.id]*100)/100;const cl=v>0?'pos':v<0?'neg':'';return`<div class="bar"><span>${m.id===me?`<b>${t('you')}</b>`:esc(m.name)}</span><div class="track"><div class="fill ${cl}" style="width:${Math.abs(v)/maxB*100}%"></div></div><span class="v ${cl}">${v?`${v>0?t('gets'):t('pays')} ${money(Math.abs(v),c)}`:t('settled')}</span></div>`}).join('')}
    <button class="btn" data-act="members" style="margin-top:14px">${t('manage')}</button>
  </section>
  ${adHtml()}
  ${Object.keys(cats).length?`<section class="panel"><h2>${t('cats')}</h2>${CATS.filter(k=>cats[k]).sort((a,b)=>cats[b]-cats[a]).map(k=>`<div class="bar"><span>${t('catN')[k]}</span><div class="track"><div class="fill" style="width:${cats[k]/maxC*100}%"></div></div><span class="v">${money(cats[k],c)}</span></div>`).join('')}</section>`:''}
  ${exps.length?`<section class="panel"><h2>${t('expenses')}</h2><ul class="list">${exps.map(([id,e])=>{const base=+e.amount*(+e.rate||1);return`<li><div><div class="t">${esc(e.desc)}${isNew(id,e)?`<span class="badge">${t('newBadge')}</span>`:''}</div><div class="s">${t('catN')[e.cat]||''} · ${t('paidBy')} ${e.payer===me?t('you'):esc(nameOf(e.payer))} · ${esc(fmtDate(e.date))}</div></div><div class="n">${money(+e.amount,e.currency)}${e.currency!==c?`<div class="s">${money(base,c)}</div>`:''}</div><div class="acts btns" style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn-sm" data-edit="${esc(id)}">${t('edit')}</button><button class="btn-sm danger" data-del="exp|${esc(id)}">${t('del')}</button></div></li>`}).join('')}</ul></section>`:''}
  ${pays.length?`<section class="panel"><h2>${t('payments')}</h2><ul class="list">${pays.map(([id,p])=>`<li><div class="t">${esc(p.from===me?t('you'):nameOf(p.from))} ${t('gave')} ${esc(p.to===me?t('you'):nameOf(p.to))}<div class="s">${esc(fmtDate(p.date))}</div></div><div class="n">${money(+p.amount,c)}</div><div class="acts"><button class="btn-sm danger" data-del="pay|${esc(id)}">${t('undo')}</button></div></li>`).join('')}</ul></section>`:''}
  ${exps.length>4?adHtml():''}`;
  $('#meSel').onchange=e=>{G.me=e.target.value;LS.set('splitto:me:'+G.id,G.me);e.target.blur();render()};
}
app.addEventListener('focusout',()=>setTimeout(()=>{if(G&&G.pending&&route.startsWith('g-'))render()},0));

/* ---------- expense sheet (add + edit) ---------- */
function openExpense(editId){
  const c=G.meta.currency,mem=G.meta.members,old=editId?G.exp[editId]:null;
  const F={mode:old?old.mode||'equal':'equal',cat:old?old.cat:'food',cur:old?old.currency:c,split:{},exact:{}};
  mem.forEach(m=>{F.split[m.id]=old?(old.split&&+old.split[m.id]>0?(F.mode==='equal'?'1':String(old.split[m.id])):'0'):'1'});
  if(old&&F.mode==='exact')mem.forEach(m=>{F.exact[m.id]=old.split&&old.split[m.id]?String(old.split[m.id]).replace('.',lang==='it'?',':'.'):''});
  const fmtN=v=>String(v).replace('.',lang==='it'?',':'.');
  const payer=old?old.payer:(member(G.me)?G.me:mem[0].id);
  openSheet(`<h2>${old?t('editExp'):t('addExp')}</h2><form id="xf" novalidate>
    <div class="field"><label for="xDesc">${t('desc')}</label><input id="xDesc" maxlength="60" placeholder="${t('descPh')}" value="${old?esc(old.desc):''}"></div>
    <div class="field"><label for="xAmt">${t('amount')}</label><div class="row"><input id="xAmt" inputmode="decimal" placeholder="0,00" value="${old?esc(fmtN(old.amount)):''}"><select id="xCur" style="flex:0 0 110px">${Object.keys(CUR).map(k=>`<option${k===F.cur?' selected':''}>${k}</option>`).join('')}</select></div></div>
    <div class="field" id="rateBox" hidden><label for="xRate">${t('rate')}: 1 <span id="rc"></span> = ? ${esc(c)}</label><input id="xRate" inputmode="decimal"><p class="muted small" style="margin:6px 0 0">${t('rateNote')}</p></div>
    <div class="field"><label for="xPay">${t('payer')}</label><select id="xPay">${mem.map(m=>`<option value="${esc(m.id)}"${m.id===payer?' selected':''}>${esc(m.name)}</option>`).join('')}</select></div>
    <div class="field"><label>${t('cat')}</label><div class="chips catpick" id="xCat">${CATS.map(k=>`<button type="button" data-c="${k}" aria-pressed="${k===F.cat}">${t('catN')[k]}</button>`).join('')}</div></div>
    <div class="field"><label>${t('split')}</label><div class="seg" id="xMode">${['equal','shares','exact'].map(m=>`<button type="button" data-m="${m}" aria-pressed="${m===F.mode}">${t(m==='shares'?'sharesM':m)}</button>`).join('')}</div><div id="xSplit" style="margin-top:10px"></div></div>
    <div class="field"><label for="xDate">${t('date')}</label><input id="xDate" type="date" value="${old&&old.date?esc(old.date):today()}"></div>
    <p class="err" id="xErr"></p>
    <div class="row"><button type="button" class="btn" id="xCancel" style="flex:1">${t('cancel')}</button><button class="btn primary" type="submit" style="flex:2">${t('save')}</button></div>
  </form>`);
  const drawSplit=()=>{
    const amt=num($('#xAmt').value);let h='';
    if(F.mode==='equal'){const k=mem.filter(m=>F.split[m.id]==='1').length;h=mem.map(m=>`<div class="splitrow"><label class="check"><input type="checkbox" data-s="${esc(m.id)}" ${F.split[m.id]==='1'?'checked':''}>${esc(m.name)}</label><span class="muted" style="text-align:right">${F.split[m.id]==='1'&&k?money(amt/k,F.cur):'—'}</span></div>`).join('')}
    else if(F.mode==='shares'){h=`<p class="muted small" style="margin:0 0 4px">${t('sharesHint')}</p>`+mem.map(m=>`<div class="splitrow"><span>${esc(m.name)}</span><input data-w="${esc(m.id)}" inputmode="decimal" value="${esc(F.split[m.id]??'1')}"></div>`).join('')}
    else{h=mem.map(m=>`<div class="splitrow"><span>${esc(m.name)}</span><input data-x="${esc(m.id)}" inputmode="decimal" placeholder="0,00" value="${esc(F.exact[m.id]||'')}"></div>`).join('')+`<p id="xLeft" style="text-align:right;margin:6px 0 0"></p>`}
    $('#xSplit').innerHTML=h;updLeft();
  };
  const updLeft=()=>{const el=$('#xLeft');if(!el)return;const amt=num($('#xAmt').value),sum=mem.reduce((a,m)=>a+num(F.exact[m.id]||0),0);el.textContent=`${t('left')}: ${money(amt-sum,F.cur)}`;el.className='small '+(Math.abs(amt-sum)<.005?'pos':'muted')};
  const updRate=keep=>{F.cur=$('#xCur').value;$('#rateBox').hidden=F.cur===c;$('#rc').textContent=F.cur;$('#xRate').value=fmtN(keep&&old&&old.currency===F.cur&&old.rate?old.rate:+rateOf(F.cur,c).toFixed(5));drawSplit()};
  $('#xCur').onchange=()=>updRate(false);
  $('#xAmt').oninput=()=>{F.mode==='exact'?updLeft():F.mode==='equal'&&drawSplit()};
  $('#xCat').onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;F.cat=b.dataset.c;$('#xCat').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b))};
  $('#xMode').onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;F.mode=b.dataset.m;mem.forEach(m=>{F.split[m.id]=F.mode==='shares'?(num(F.split[m.id])>0?F.split[m.id]:'1'):(num(F.split[m.id])>0?'1':'0')});$('#xMode').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));drawSplit()};
  $('#xSplit').addEventListener('input',e=>{const s=e.target.dataset;if(s.s){F.split[s.s]=e.target.checked?'1':'0';drawSplit()}else if(s.w)F.split[s.w]=e.target.value;else if(s.x){F.exact[s.x]=e.target.value;updLeft()}});
  $('#xCancel').onclick=closeSheet;
  $('#xf').onsubmit=async e=>{
    e.preventDefault();const err=$('#xErr'),desc=$('#xDesc').value.trim(),amt=num($('#xAmt').value);
    if(!desc||!(amt>0)){err.textContent=t('errAmt');return}
    let split={};
    if(F.mode==='exact'){mem.forEach(m=>{const v=num(F.exact[m.id]||0);if(v>0)split[m.id]=Math.round(v*100)/100});const s=Object.values(split).reduce((a,b)=>a+b,0);if(Math.abs(s-amt)>.005){err.textContent=t('errExact');return}}
    else mem.forEach(m=>{const v=F.mode==='equal'?(F.split[m.id]==='1'?1:0):num(F.split[m.id]);if(v>0)split[m.id]=v});
    if(!Object.keys(split).length){err.textContent=t('errSplit');return}
    const rate=F.cur===c?1:(num($('#xRate').value)||rateOf(F.cur,c));
    const body={desc,amount:Math.round(amt*100)/100,currency:F.cur,rate,payer:$('#xPay').value,cat:F.cat,mode:F.mode,split,date:$('#xDate').value||today(),ts:old?old.ts||Date.now():Date.now(),addedBy:old?old.addedBy||'':(member(G.me)?G.me:'')};
    if(old)body.editedAt=Date.now();
    const ok=await putItem('exp',editId||uid(12),body);
    if(ok!==false){closeSheet();toast(t('addOk'))}
  };
  updRate(true);
}

/* ---------- payment sheet (full or partial) ---------- */
function openPay(from,to,amount){
  const c=G.meta.currency;
  openSheet(`<h2>${t('payT')}</h2><p>${debtText({from,to},member(G.me)?G.me:'')}</p>
  <form id="pf" novalidate><div class="field"><label for="pAmt">${t('payAmt')}</label><input id="pAmt" inputmode="decimal" value="${esc(String(amount).replace('.',lang==='it'?',':'.'))}"></div>
  <p class="muted small">${t('payNote')}</p><div class="field"><label for="pDate">${t('date')}</label><input id="pDate" type="date" value="${today()}"></div><p class="err" id="pErr"></p>
  <div class="row"><button type="button" class="btn" data-act="close" style="flex:1">${t('cancel')}</button><button class="btn primary" type="submit" style="flex:2">${t('payT')}</button></div></form>`);
  $('#pf').onsubmit=async e=>{e.preventDefault();const v=Math.round(num($('#pAmt').value)*100)/100;if(!(v>0)){$('#pErr').textContent=t('payErr');return}
    const ok=await putItem('pay',uid(12),{from,to,amount:v,date:$('#pDate').value||today(),ts:Date.now()});if(ok!==false){closeSheet();toast(t('paidOk'))}};
}

/* ---------- members sheet: rename, payment details, remove, add ---------- */
function openMembers(){
  const list=G.meta.members.map(m=>({...m}));
  const draw=()=>{
    $('#mList').innerHTML=list.map((m,i)=>`<details class="mem"${m._new?' open':''}><summary>${esc(m.name||'…')}</summary>
      <div class="field"><label>${t('memName')}</label><input data-i="${i}" data-k="name" maxlength="30" value="${esc(m.name)}"></div>
      <div class="field"><label>${t('iban')}</label><input data-i="${i}" data-k="iban" maxlength="40" autocapitalize="characters" value="${esc(m.iban||'')}"></div>
      <div class="field"><label>${t('paypal')}</label><input data-i="${i}" data-k="paypal" maxlength="40" autocapitalize="off" value="${esc(m.paypal||'')}"></div>
      <div class="field"><label>${t('satispay')}</label><input data-i="${i}" data-k="satispay" maxlength="20" inputmode="tel" value="${esc(m.satispay||'')}"></div>
      <button type="button" class="btn-sm danger" data-rm="${i}">${t('remove')}</button></details>`).join('');
  };
  openSheet(`<h2>${t('membersT')}</h2><div id="mList"></div>
  <div class="row" style="margin:14px 0"><input id="mNew" maxlength="30" placeholder="${t('personPh')}"><button type="button" class="btn" id="mAdd">${t('addPerson')}</button></div>
  <p class="err" id="mErr"></p><div class="row"><button type="button" class="btn" data-act="close" style="flex:1">${t('cancel')}</button><button type="button" class="btn primary" id="mSave" style="flex:2">${t('saveMem')}</button></div>`);
  draw();
  $('#mList').addEventListener('input',e=>{const d=e.target.dataset;if(d.k){list[+d.i][d.k]=e.target.value;if(d.k==='name')e.target.closest('details').querySelector('summary').textContent=e.target.value||'…'}});
  $('#mList').addEventListener('click',e=>{const b=e.target.closest('[data-rm]');if(!b)return;const m=list[+b.dataset.rm];if(!m._new&&used(m.id)){$('#mErr').textContent=t('cantRemove');return}list.splice(+b.dataset.rm,1);draw()});
  const add=()=>{const v=$('#mNew').value.trim();if(!v)return;list.push({id:uid(6),name:v,_new:true});$('#mNew').value='';draw()};
  $('#mAdd').onclick=add;$('#mNew').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();add()}});
  $('#mSave').onclick=async()=>{if($('#mNew').value.trim())add();
    if(list.some(m=>!String(m.name).trim())){$('#mErr').textContent=t('nameEmpty');return}
    const clean=list.map(m=>{const o={id:m.id,name:String(m.name).trim()};for(const k of['iban','paypal','satispay']){const v=String(m[k]||'').trim();if(v)o[k]=k==='iban'?v.toUpperCase().replace(/\s+/g,' '):v}return o});
    if(await setMembers(clean)!==false){closeSheet();toast(t('memSaved'))}};
}

/* ---------- premium, share, export ---------- */
function openPremium(reason){
  openSheet(`<h2>${t('premT')}</h2>${reason?`<p class="note">${esc(reason)}</p>`:''}<p class="muted">${t('premSub')}</p>
  <ul class="feat"><li>${t('f1')}</li><li>${t('f2')}</li><li>${t('f3')}</li></ul><p class="price">${t('price')}</p>
  ${premium()?`<p>${t('active')}</p><div class="row"><button class="btn" data-act="premOff" style="flex:1">${t('deactivate')}</button><button class="btn primary" data-act="close" style="flex:1">${t('close')}</button></div>`:`<button class="btn primary block" data-act="premOn">${t('activate')}</button>`}
  <p class="muted small" style="margin-top:14px">${t('demoNote')}</p>`);
}
function plainDebt(d){const c=G.meta.currency;return lang==='it'?`${nameOf(d.from)} deve ${money(d.amount,c)} a ${nameOf(d.to)}`:`${nameOf(d.from)} owes ${nameOf(d.to)} ${money(d.amount,c)}`}
function summaryText(){
  const c=G.meta.currency,{total,settle}=compute();
  const lines=[`Splitto · ${G.meta.name}`,`${t('total')}: ${money(total,c)}`,'',t('who')+':'];
  if(!settle.length)lines.push(t('even'));
  settle.forEach(d=>{lines.push('- '+plainDebt(d));const m=member(d.to)||{};if(m.iban)lines.push('  IBAN: '+m.iban);if(m.paypal)lines.push('  PayPal: https://paypal.me/'+String(m.paypal).replace(/^@/,''));if(m.satispay)lines.push('  Satispay: '+m.satispay)});
  lines.push('',groupUrl(G.id),`${t('madeWith')} · ${location.host}`);
  return lines.join('\n');
}
async function exportPdf(){
  if(pdfLimited()&&pdfState().n>=3){openPremium(t('limitHit'));return}
  if(!window.jspdf){toast(t('pdfLib'));return}
  const c=G.meta.currency,{bal,total,settle}=compute(),Pp=s=>String(s).replace(/[  ]/g,' ');
  const doc=new window.jspdf.jsPDF({unit:'pt',format:'a4'}),W=595;let y=0;
  const need=h=>{if(y+h>800){doc.addPage();y=50}};
  doc.setFillColor(12,12,13);doc.rect(0,0,W,96,'F');
  doc.setTextColor(234,209,154);doc.setFont('times','bolditalic');doc.setFontSize(26);doc.text('Splitto',40,48);
  doc.setTextColor(242,237,227);doc.setFont('helvetica','normal');doc.setFontSize(13);doc.text(Pp(G.meta.name),40,74);
  doc.setFontSize(10);doc.text(Pp(new Date().toLocaleDateString(loc())),W-40,74,{align:'right'});
  y=130;doc.setTextColor(20,20,20);
  const h2=s=>{need(40);doc.setFont('helvetica','bold');doc.setFontSize(14);doc.setTextColor(150,115,50);doc.text(Pp(s),40,y);y+=8;doc.setDrawColor(201,164,92);doc.line(40,y,W-40,y);y+=20;doc.setTextColor(20,20,20);doc.setFont('helvetica','normal');doc.setFontSize(11)};
  const line=(l,r,bold)=>{need(18);doc.setFont('helvetica',bold?'bold':'normal');doc.text(doc.splitTextToSize(Pp(l),380)[0],40,y);doc.text(Pp(r),W-40,y,{align:'right'});y+=18};
  h2(t('who'));doc.setFontSize(12);
  if(settle.length)settle.forEach(d=>{line(lang==='it'?`${nameOf(d.from)} deve a ${nameOf(d.to)}`:`${nameOf(d.from)} owes ${nameOf(d.to)}`,money(d.amount,c),true);const m=member(d.to)||{};doc.setFontSize(10);if(m.iban)line('   IBAN '+m.iban,'');if(m.paypal)line('   paypal.me/'+String(m.paypal).replace(/^@/,''),'');if(m.satispay)line('   Satispay '+m.satispay,'');doc.setFontSize(12)});
  else line(t('even'),'');
  y+=10;h2(t('balances'));
  G.meta.members.forEach(m=>{const v=Math.round(bal[m.id]*100)/100;line(m.name,v?`${v>0?t('gets'):t('pays')} ${money(Math.abs(v),c)}`:t('settled'))});
  y+=10;h2(`${t('expenses')} · ${t('total')} ${money(total,c)}`);
  Object.values(G.exp).sort((a,b)=>(a.date||'').localeCompare(b.date||'')).forEach(e=>line(`${fmtDate(e.date)}  ${e.desc} (${t('paidBy')} ${nameOf(e.payer)})`,money(+e.amount,e.currency)+(e.currency!==c?` = ${money(+e.amount*(+e.rate||1),c)}`:'')));
  const pays=Object.values(G.pay);if(pays.length){y+=10;h2(t('payments'));pays.forEach(p=>line(`${fmtDate(p.date)}  ${nameOf(p.from)} ${t('gave')} ${nameOf(p.to)}`,money(+p.amount,c)))}
  const pages=doc.getNumberOfPages();for(let i=1;i<=pages;i++){doc.setPage(i);doc.setFontSize(9);doc.setTextColor(140,140,140);doc.text(Pp(`${t('madeWith')} · ${location.host}`),40,820)}
  const slug=G.meta.name.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'gruppo';
  try{doc.save(`splitto-${slug}.pdf`);
    if(pdfLimited()){const st=pdfState();P.pdf={d:st.d,n:st.n+1};saveProf()}toast(t('pdfSaved'));render()}
  catch(e){toast(t('pdfFail'))}
}
function openShare(){
  const url=groupUrl(G.id),msg=`${G.meta.name} · Splitto\n${url}`;
  openSheet(`<h2>${t('shareT')}</h2><p class="muted">${t('shareP1')}</p>
  <p class="note" style="word-break:break-all">${esc(url)}</p><p class="muted small">${t('shareP2')}</p>
  <div class="row" style="margin-top:14px">${navigator.share?`<button class="btn primary" data-act="nativeShare" style="flex:1 1 140px">${t('shareBtn')}</button>`:''}
  <a class="btn" style="flex:1 1 140px" href="https://wa.me/?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">${t('wa')}</a>
  <button class="btn" data-act="copyCode" style="flex:1 1 140px">${t('copy')}</button></div>`);
}
async function copy(txt,ok){try{await navigator.clipboard.writeText(txt);toast(ok)}catch(e){toast(t('copyFail'))}}

/* ---------- events ---------- */
let armed=null;
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-act],[data-pay],[data-del],[data-edit],[data-copy]');if(!a)return;
  if(a.dataset.copy){copy(a.dataset.copy,t('copied'));return}
  if(a.dataset.pay){const[f,to,amt]=a.dataset.pay.split('|');openPay(f,to,+amt);return}
  if(a.dataset.edit){if(G.exp[a.dataset.edit])openExpense(a.dataset.edit);return}
  if(a.dataset.del){
    if(armed&&armed.el===a){clearTimeout(armed.tm);armed=null;const[kind,id]=a.dataset.del.split('|');delItem(kind,id);return}
    if(armed){clearTimeout(armed.tm);armed.el.classList.remove('armed');armed.el.textContent=armed.txt}
    armed={el:a,txt:a.textContent,tm:setTimeout(()=>{if(armed&&armed.el===a){a.classList.remove('armed');a.textContent=armed.txt;armed=null}},4000)};
    a.classList.add('armed');a.textContent=t('sure');return}
  const act=a.dataset.act;
  if(act==='add')openExpense();
  else if(act==='pdf')exportPdf();
  else if(act==='copy')copy(summaryText(),t('sumCopied'));
  else if(act==='share')openShare();
  else if(act==='members')openMembers();
  else if(act==='copyCode')copy(groupUrl(G.id),t('copied'));
  else if(act==='nativeShare')navigator.share({title:G.meta.name+' · Splitto',url:groupUrl(G.id)}).catch(()=>{});
  else if(act==='prem')openPremium();
  else if(act==='premOn'){P.premium=true;saveProf();closeSheet();render(true);toast(t('active'))}
  else if(act==='premOff'){P.premium=false;saveProf();closeSheet();render(true)}
  else if(act==='close')closeSheet();
});
$('#premBtn').hidden=!CONFIG.premium;$('#premBtn').onclick=()=>openPremium();
const setLang=l=>{lang=l;LS.set('splitto:lang',l);document.documentElement.lang=l;render(true)};
$('#l-it').onclick=()=>setLang('it');$('#l-en').onclick=()=>setLang('en');

/* ---------- routing ---------- */
let route='';
function render(full){
  $('#l-it').setAttribute('aria-pressed',lang==='it');$('#l-en').setAttribute('aria-pressed',lang==='en');
  const L=lang==='it'?{trip:'/dividere-spese-viaggio/',room:'/dividere-spese-coinquilini/',dinner:'/dividere-conto-ristorante/',about:'/chi-siamo/'}:{trip:'/en/split-trip-expenses/',room:'/en/split-rent-roommates/',dinner:'/dividere-conto-ristorante/',about:'/chi-siamo/'};
  $('#foot').innerHTML=`<nav><a href="${L.trip}">${t('navTrip')}</a><a href="${L.room}">${t('navRoom')}</a>${lang==='it'?`<a href="${L.dinner}">${t('navDinner')}</a>`:''}<a href="/privacy/">${t('navPrivacy')}</a><a href="${L.about}">${t('navAbout')}</a></nav>${esc(t('proto'))}`;
  if(route.startsWith('g-'))viewGroup();
  else if(full||route!==render.last){if(route==='quick')viewQuick();else viewHome()}
  render.last=route;
}
function onRoute(){
  const h=location.hash.replace('#','');const prev=route;route=h;
  closeSheet();
  if(h.startsWith('g-')){const id=h.slice(2);if(!G||G.id!==id)openGroup(id);else render()}
  else{if(prev.startsWith('g-'))closeGroup();render(true)}
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',onRoute);
document.documentElement.lang=lang;
onRoute();
}
