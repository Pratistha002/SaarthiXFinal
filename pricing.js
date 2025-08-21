// Navigation for Pricing button; dropdown opens on hover via CSS
(function(){
  const btn = document.querySelector('#pricingToggleBtn');
  if(!btn) return;
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = 'pricing.html';
  });
})();