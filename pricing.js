// Minimal script: keep Pricing button behavior only
(function(){
  const btn = document.querySelector('#pricingToggleBtn');
  if(!btn) return;
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = 'pricing.html';
  });
})();