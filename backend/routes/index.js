const AuthUser = require("../schemas/AuthSchema");
const User = require("../schemas/UserSchema");
const uuidv1 = require("uuid").v1;

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("BACKEND TAXIMISE");
  });

  app.post("/auth/sign-out", (req, res) => {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if (err) {
          return next(err);
        } else {
          return res.send({ signed: false });
        }
      });
    }
  });

  app.post("/auth/sign-in", (req, res, next) => {
    console.log(req.body);
    if (req.body.email && req.body.password) {
      AuthUser.authenticate(req.body.email, req.body.password, function(
        error,
        auth
      ) {
        // console.log("USER: " + user);
        if (error || !auth) {
          var err = new Error("Wrong email or password.");
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = auth._id;
          User.findById(auth._id, (err, user) => {
            if (!user) return next(err);
            const profileIds = Array.from(user.profileList.keys());
            const profilesObj = {};
            profileIds.forEach(id => {
              profilesObj[id] = user.profileList.get(id).name;
            });
            const result = {
              ...user._doc,
              profileList: profilesObj
            };

            return res.send({ signed: true, id: auth._id, user: result });
          });
        }
      });
    } else {
      var err = new Error("All fields required.");
      err.status = 400;
      return next(err);
    }
  });

  app.post("/auth/sign-up", (req, res, next) => {
    if (
      req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.name &&
      req.body.state &&
      req.body.zipCode &&
      req.body.income &&
      req.body.filingStatus
    ) {
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      };
      //use schema.create to insert data into the db
      AuthUser.create(userData, function(err, user) {
        if (err) {
          return next(err);
        } else {
          req.session.userId = user._id;

          const profile = {
            profileId: uuidv1(),
            name: req.body.name,
            category: "Personal",
            description: "Individual Account for Expenses",
            expenseList: {},
            email: req.body.email,
            state: req.body.state,
            zipCode: req.body.zipCode,
            creditCard: {},
            bankAccount: {}
          };

          var userInfo = {
            _id: user._id,
            userId: user._id,
            name: req.body.name,
            profileList: new Map(),
            email: userData.email,
            income: parseFloat(req.body.income),
            filingStatus: req.body.filingStatus
          };
          userInfo.profileList.set(profile.profileId, profile);

          const profileIds = Array.from(userInfo.profileList.keys());
          const profilesObj = {};
          profileIds.forEach(id => {
            profilesObj[id] = userInfo.profileList.get(id).name;
          });
          const result = {
            ...userInfo,
            profileList: profilesObj
          };

          User.create(userInfo, function(error, info) {
            if (error) {
              return next(error);
            } else {
              return res.send({ signed: true, auth: user._id, user: result });
            }
          });
        }
      });
    } else {
      var err = new Error("All fields required.");
      err.status = 400;
      return next(err);
    }
  });

  // ADD NEW PROFILE
  app.post("/add-profile", (req, res, next) => {
    console.log(req.body);
    // add a new profile object to the user's profileList
    if (
      req.body.name &&
      req.body.userId &&
      req.body.category &&
      req.body.description &&
      req.body.email &&
      req.body.state &&
      req.body.zipCode &&
      req.body.creditCard &&
      req.body.bankAccount
    ) {
      // first, find the user with the corresponding userId, create a new profile & add it to their list
      User.findById(req.body.userId, (err, user) => {
        if (!user) return next(err);
        const profile = {
          profileId: uuidv1(),
          name: req.body.name,
          category: req.body.category,
          description: req.body.description,
          expenseList: {},
          email: req.body.email,
          state: req.body.state,
          zipCode: req.body.zipCode,
          creditCard: req.body.creditCard,
          bankAccount: req.body.bankAccount
        };
        const map = user.profileList;
        map.set(profile.profileId, profile);
        // then, update the user's profileList attribute with the modified list from the previous callback
        User.updateOne(
          { userId: req.body.userId },
          { profileList: map },
          err => {
            return err ? next(err) : res.send({ profileId: profile.profileId });
          }
        );
      });
    } else {
      var err = new Error("All fields required.");
      err.status = 400;
      return next(err);
    }
  });

  // GET A SPECIFIC PROFILE
  app.get("/get-profile", (req, res, next) => {
    if (req.query.userId && req.query.profileId) {
      //query for user specific profile with an identifier, {}
      User.findById(req.query.userId, (err, user) => {
        if (!user) return next(err);
        const profile = user.profileList.get(req.query.profileId);

        let totalAmount = 0;
        for (var key of Object.keys(profile.expenseList)) {
            totalAmount += parseFloat(profile.expenseList[key].amount);
        }

        let deductible = 0.15 * totalAmount;
        return res.send({ profile: profile, totalExpenseAmount: totalAmount.toFixed(2), 
            deductible: deductible.toFixed(2)});
      });
    } else {
      var err = new Error("Authenticate.");
      err.status = 400;
      return next(err);
    }
  });

  // GET ALL PROFILES
  app.get("/get-all-profiles", (req, res, next) => {
    if (req.query.userId) {
      User.findById(req.query.userId, (err, user) => {
        if (!user) return next(err);
        const profileIds = Array.from(user.profileList.keys());
        const profilesObj = {};
        profileIds.forEach(id => {
          profilesObj[id] = user.profileList.get(id).name;
        });
        return res.send(profilesObj);
      });
    } else {
      var err = new Error("Authenticate.");
      err.status = 400;
      return next(err);
    }
  });

  // UPDATE PROFILE
  // find the corresponding profileId, update the current user's profileList with the newest profile
  app.put("/update-profile", (req, res, next) => {
    if (req.body.userId && req.body.profile) {
      User.findById(req.body.userId, (err, user) => {
        // check if the request's profile Id  exists in the user's profile list in Mongo
        if (user) {
          const map = user.profileList;
          const profile = JSON.parse(req.body.profile);
          map.set(profile.profileId, profile);
          User.updateOne(
            { userId: req.body.userId },
            { profileList: map },
            err => {
              return err
                ? next(err)
                : res.send({ updated: true, profile: profile });
            }
          );
        } else {
          var err = new Error("Authenticate.");
          err.status = 400;
          return next(err);
        }
      });
    } else {
      var err = new Error("Authenticate.");
      err.status = 400;
      return next(err);
    }
  });

  // DELETE PROFILE
  app.delete("/delete-profile", (req, res, next) => {
    // delete a profile from the user's profileList
    if (req.body.userId && req.body.profileId) {
      User.findById(req.body.userId, (err, user) => {
        if (!user) return next(err);
        const map = user.profileList;
        map.delete(req.body.profileId);
        User.updateOne(
          { userId: req.body.userId },
          { profileList: map },
          err => {
            return err ? next(err) : res.send({ deleted: true });
          }
        );
      });
    } else {
      var err = new Error("Authenticate.");
      err.status = 400;
      return next(err);
    }
  });

  // *** CRUD actions for handling expenses

  // ADD EXPENSE
  app.post("/add-expense", (req, res, next) => {
    console.log(req.body);
    if (
      req.body.userId &&
      req.body.profileId &&
      req.body.description &&
      req.body.amount &&
      req.body.category &&
      req.body.date &&
      req.body.title
    ) {
      //query for user specific profile with an identifier, {}
      User.findById(req.body.userId, (err, user) => {
        if (!user) return next(err);
        const expense = {
          expenseId: uuidv1(),
          description: req.body.description,
          amount: req.body.amount,
          category: req.body.category,
          date: req.body.date,
          title: req.body.title
        };
        const map = user.profileList;
        const profile = map.get(req.body.profileId);
        profile.expenseList[expense.expenseId] = expense;
        map.set(req.body.profileId, profile);
        User.updateOne(
          { userId: req.body.userId },
          { profileList: map },
          err => {
            return err
              ? next(err)
              : res.send({ added: true, expenseId: expense.expenseId });
          }
        );
      });
    } else {
      var err = new Error("Authenticate.");
      err.status = 400;
      return next(err);
    }
  });

  // GET A SPECIFIC EXPENSE
  app.get("/get-expense", (req, res, next) => {
    if (req.query.userId && req.query.profileId && req.query.expenseId) {
      User.findById(req.query.userId, (err, user) => {
        if (!user) return next(err);
        const profile = user.profileList.get(req.query.profileId);
        return res.send({
          expense: profile.expenseList[req.query.expenseId]
        });
      });
    } else {
      var err = new Error("Authenticate.");
      err.status = 400;
      return next(err);
    }
  });

  // GET ALL EXPENSES
  app.get("/get-all-expenses", (req, res, next) => {
    if (req.query.userId) {
      User.findById(req.query.userId, (err, user) => {
        if (!user) return next(err);
        let result = {};
        const profileIds = Array.from(user.profileList.keys());
        profileIds.forEach(profileId => {
          const expList = user.profileList.get(profileId).expenseList;
          Object.keys(expList).forEach(expenseId => {
            result[expenseId] = expList[expenseId];
          });
        });
        return res.send({ expenses: result });
      });
    } else {
      var err = new Error("Authenticate.");
      err.status = 400;
      return next(err);
    }
  });

  // UPDATE EXPENSE
  app.put("/update-expense", (req, res, next) => {
    if (req.body.userId && req.body.profileId && req.body.expense) {
      User.findById(req.body.userId, (err, user) => {
        if (!user) return next(err);
        const map = user.profileList;
        const profile = map.get(req.body.profileId);
        profile.expenseList[req.body.expense.expenseId] = req.body.expense;
        map.set(req.body.profileId, profile);
        User.updateOne(
          { userId: req.body.userId },
          { profileList: map },
          err => {
            return err ? next(err) : res.send({ updated: true });
          }
        );
      });
    }
  });

  // DELETE EXPENSE
  app.delete("/delete-expense", (req, res, next) => {
    // delete a profile from the user's profileList
    if (req.body.userId && req.body.profileId && req.body.expenseId) {
      User.findById(req.body.userId, (err, user) => {
        if (!user) return next(err);
        const map = user.profileList;
        const profile = map.get(req.body.profileId);
        delete profile.expenseList[req.body.expenseId];
        map.set(req.body.profileId, profile);
        User.updateOne(
          { userId: req.body.userId },
          { profileList: map },
          err => {
            return err ? next(err) : res.send({ deleted: true });
          }
        );
      });
    } else {
      var err = new Error("Authenticate.");
      err.status = 400;
      return next(err);
    }
  });

  // GET TAX INFO
  app.get("/get-tax-info", (req, res, next) => {
    // **** Do we need req.body.profileId as well?
    if (req.query.userId) {
      User.findById(req.query.userId, (err, user) => {
        if (!user) return next(err);

        const standardDeductions = {};
        standardDeductions["Single"] = 12400;
        standardDeductions["Married Filing Separately (MFS)"] = 12400;
        standardDeductions["Head of Household (HOH)"] = 18650;

        const taxBrackets = [
          {
            taxRate: 0.1,
            Single: { min: 0, max: 9875 },
            "Married Filing Separately (MFS)": { min: 0, max: 19750 },
            "Head of Household (HOH)": { min: 0, max: 14100 }
          },
          {
            taxRate: 0.12,
            Single: { min: 9875, max: 40125 },
            "Married Filing Separately (MFS)": { min: 19750, max: 80250 },
            "Head of Household (HOH)": { min: 14100, max: 53700 }
          },
          {
            taxRate: 0.22,
            Single: { min: 40125, max: 85525 },
            "Married Filing Separately (MFS)": { min: 80250, max: 171050 },
            "Head of Household (HOH)": { min: 53700, max: 85500 }
          },
          {
            taxRate: 0.24,
            Single: { min: 85525, max: 163300 },
            "Married Filing Separately (MFS)": { min: 171050, max: 326600 },
            "Head of Household (HOH)": { min: 85500, max: 163300 }
          },
          {
            taxRate: 0.32,
            Single: { min: 163300, max: 207350 },
            "Married Filing Separately (MFS)": { min: 326600, max: 414700 },
            "Head of Household (HOH)": { min: 163300, max: 207350 }
          },
          {
            taxRate: 0.35,
            Single: { min: 207350, max: 518400 },
            "Married Filing Separately (MFS)": { min: 414700, max: 622050 },
            "Head of Household (HOH)": { min: 207350, max: 518400 }
          },
          {
            taxRate: 0.37,
            Single: { min: 518400, max: Number.MAX_SAFE_INTEGER },
            "Married Filing Separately (MFS)": {
              min: 622050,
              max: Number.MAX_SAFE_INTEGER
            },
            "Head of Household (HOH)": {
              min: 518400,
              max: Number.MAX_SAFE_INTEGER
            }
          }
        ];

        // calculate total tax balance by iterating through the tax brackets
        const filingStatus = user.filingStatus[0];

        taxableIncome = user.income - Math.max(standardDeductions[filingStatus], );
        let taxBalance = 0;
        for (let i = 0; i < taxBrackets.length; i++) {
          let bracket = taxBrackets[i];
          taxedAmount =
            Math.min(taxableIncome, bracket[filingStatus].max) -
            bracket[filingStatus].min;
          taxBalance += bracket.taxRate * taxedAmount;
          if (taxableIncome < bracket[filingStatus].max) {
            break;
          }
        }
        const takeHomePay = taxableIncome - taxBalance;

        let result = {};
        result["Federal Income Tax Balance"] = taxBalance;
        result["Standard Deduction"] = standardDeductions[user.filingStatus];
        result["Take-Home Pay"] = takeHomePay;
        return res.send(result);
      });
    }
  });

  // DELETE ACCOUNT
  app.delete("/auth/accountdelete", (req, res, next) => {
    User.findByIdAndDelete(req.body.userId, err => {
      if (err) return next(err);
      res.send({ delete: true });
    });
    Auth.findByIdAndDelete(req.body.email, err => {
      if (err) return next(err);
      res.send({ delete: true });
    });
  });
};
