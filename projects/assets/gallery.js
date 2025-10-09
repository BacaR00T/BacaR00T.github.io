// Lightweight gallery/lightbox (no deps)
(function(){
  function initGallery(root){
    const items=[...root.querySelectorAll('[data-item]')];
    if(!items.length) return;

    const lb=document.createElement('div');
    lb.className='lb';
    lb.innerHTML=`
      <div class="lb__wrap">
        <div class="lb__img"><img alt=""></div>
        <div class="lb__side">
          <div class="lb__caption"></div>
          <div class="lb__meta"></div>
        </div>
        <button class="lb__close" aria-label="Close">✕</button>
        <div class="lb__nav">
          <button class="lb__btn" data-prev>⟨ Prev</button>
          <button class="lb__btn" data-next>Next ⟩</button>
        </div>
      </div>`;
    document.body.appendChild(lb);

    const imgEl=lb.querySelector('.lb__img img');
    const capEl=lb.querySelector('.lb__caption');
    const metaEl=lb.querySelector('.lb__meta');
    const prevBtn=lb.querySelector('[data-prev]');
    const nextBtn=lb.querySelector('[data-next]');
    const closeBtn=lb.querySelector('.lb__close');

    let idx=0;
    function open(i){
      idx=i;
      const fig=items[idx];
      const full=fig.dataset.full || fig.querySelector('img')?.src;
      const cap=fig.dataset.caption || fig.querySelector('figcaption')?.textContent || '';
      const alt=fig.querySelector('img')?.alt || '';
      imgEl.src=full; imgEl.alt=alt;
      capEl.textContent=cap;
      metaEl.textContent=`${idx+1} / ${items.length}`;
      lb.setAttribute('data-open','true');
      document.body.style.overflow='hidden';
    }
    function close(){ lb.removeAttribute('data-open'); document.body.style.overflow=''; imgEl.src=''; }
    function next(){ open((idx+1)%items.length); }
    function prev(){ open((idx-1+items.length)%items.length); }

    items.forEach((fig,i)=>fig.addEventListener('click',()=>open(i)));
    closeBtn.addEventListener('click',close);
    lb.addEventListener('click',e=>{ if(e.target===lb) close(); });
    nextBtn.addEventListener('click',next);
    prevBtn.addEventListener('click',prev);
    document.addEventListener('keydown',e=>{
      if(lb.getAttribute('data-open')!=='true') return;
      if(e.key==='Escape') close();
      if(e.key==='ArrowRight') next();
      if(e.key==='ArrowLeft') prev();
    });
  }
  window.addEventListener('DOMContentLoaded',()=> {
    document.querySelectorAll('[data-gallery]').forEach(initGallery);
  });
})();
