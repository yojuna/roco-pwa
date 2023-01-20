document.addEventListener('DOMContentLoaded', init, false);
function init() {
  if ('serviceWorker' in navigator) {
    // Wait for the 'load' event to not block other work
    window.addEventListener('load', async () => {
        // Try to register the service worker.
        try {
          const reg = await navigator.serviceWorker.register('./pwa/service-worker.js');
          // const reg_2 = await navigator.serviceWorker.register('./js/service-worker_js.js');
          console.log('Service worker registered! 😎', reg);
          // console.log('Service worker registered! 😎', reg_2);
        } catch (err) {
          console.log('😥 Service worker registration failed: ', err);
        }
      });
  }
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
// addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});






window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion
    hideInstallPromotion();
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');
  });

function getPWADisplayMode() {
    console.log('FLAG || inside getPWADisplayMode() << pwa.js')
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (document.referrer.startsWith('android-app://')) {
      return 'twa';
    } else if (navigator.standalone || isStandalone) {
      return 'standalone';
    }
    return 'browser';
  }






// MDN example
// document.addEventListener('DOMContentLoaded', init, false);
// function init() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then((reg) => {
//         console.log('Service worker registered -->', reg);
//       }, (err) => {
//         console.error('Service worker not registered -->', err);
//       });
//   }
// }


// // Alternate, using try catch | ref: https://developers.google.com/codelabs/pwa-training/pwa03--going-offline#3
// // Register the service worker
// if ('serviceWorker' in navigator) {
//     // Wait for the 'load' event to not block other work
//     window.addEventListener('load', async () => {
//       // Try to register the service worker.
//       try {
//         const reg = await navigator.serviceWorker.register(swURL);
//         console.log('Service worker registered! 😎', reg);
//       } catch (err) {
//         console.log('😥 Service worker registration failed: ', err);
//       }
//     });
//   }



// // Initialize deferredPrompt for use later to show browser install prompt.
// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent the mini-infobar from appearing on mobile
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI notify the user they can install the PWA
//   showInstallPromotion();
//   // Optionally, send analytics event that PWA install promo was shown.
//   console.log(`'beforeinstallprompt' event was fired.`);
// });


// buttonInstall.addEventListener('click', async () => {
//     // Hide the app provided install promotion
//     hideInstallPromotion();
//     // Show the install prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     const { outcome } = await deferredPrompt.userChoice;
//     // Optionally, send analytics event with outcome of user choice
//     console.log(`User response to the install prompt: ${outcome}`);
//     // We've used the prompt, and can't use it again, throw it away
//     deferredPrompt = null;
//   });


// window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
//     let displayMode = 'browser';
//     if (evt.matches) {
//       displayMode = 'standalone';
//     }
//     // Log display mode change to analytics
//     console.log('DISPLAY_MODE_CHANGED', displayMode);
//   });


// // Code to handle install prompt on desktop

// let deferredPrompt;
// const addBtn = document.querySelector('.add-button');
// addBtn.style.display = 'none';

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI to notify the user they can add to home screen
//   addBtn.style.display = 'block';

//   addBtn.addEventListener('click', () => {
//     // hide our user interface that shows our A2HS button
//     addBtn.style.display = 'none';
//     // Show the prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === 'accepted') {
//         console.log('User accepted the A2HS prompt');
//       } else {
//         console.log('User dismissed the A2HS prompt');
//       }
//       deferredPrompt = null;
//     });
//   });
// });
