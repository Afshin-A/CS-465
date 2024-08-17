Instead of having a separate file for each url, it is possible to have related routes together in 1 file.
The same logic applies to controllers. We can have the related controllers all in 1 file.

To be clear, for routers, you would be using the same router object like this:
```js
...

const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/a', ctrlMain.a);
router.get('/b', ctrlMain.b);
router.get('/c', ctrlMain.c);

...

module.exports = router;
```
