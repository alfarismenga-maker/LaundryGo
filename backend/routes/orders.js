const express = require("express");
const db = require("../config/db");

const router = express.Router();

/*
CREATE ORDER
*/
router.post("/", (req, res) => {
  const {
    user_id,
    service_type,
    weight,
    total_price,
  } = req.body;

  const sql = `
    INSERT INTO orders
    (user_id, service_type, weight, total_price)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, service_type, weight, total_price],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "Pesanan berhasil dibuat",
      });
    }
  );
});

/*
GET ALL ORDERS
*/
router.get("/", (req, res) => {
  const sql = `
    SELECT
      orders.*,
      users.name
    FROM orders
    JOIN users
    ON orders.user_id = users.id
    ORDER BY orders.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.json(result);
  });
});

/*
UPDATE STATUS ORDER
*/

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql =
    "UPDATE orders SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.json({
      message: "Status berhasil diperbarui",
    });
  });
});


/*
/*
GET ORDER BY USER
*/

router.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    console.log(result);

    res.json(result);
  });
});

/*
ADMIN STATS
*/

router.get("/stats/dashboard", (req, res) => {
  const sql = `
    SELECT
      COUNT(*) as total_orders,
      SUM(total_price) as total_revenue,
      SUM(
        CASE
          WHEN status = 'Selesai'
          THEN 1
          ELSE 0
        END
      ) as completed_orders,
      SUM(
        CASE
          WHEN status != 'Selesai'
          THEN 1
          ELSE 0
        END
      ) as processing_orders
    FROM orders
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.json(result[0]);
  });
});

module.exports = router;