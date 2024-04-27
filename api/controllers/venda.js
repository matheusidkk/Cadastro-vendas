import { db } from "../db.js"

export const getVendas = (_, res) => {
    const q = "SELECT * FROM vendas"

    db.query(q, (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}

export const addVenda = (req, res) => {
    const q = "INSERT INTO vendas(`item`, `marca`, `preco`, `comprador`, `data`, `horario`) VALUES(?)"

    const values = [
        req.body.item,
        req.body.marca,
        req.body.preco,
        req.body.comprador,
        req.body.data,
        req.body.horario,
    ]

    db.query(q, [values], (err) => {
        if (err) return res.json(err)

        return res.status(200).json()
    })
}

export const updateVenda = (req, res) => {
    const q = "UPDATE vendas SET `item` = ?, `marca` = ?, `preco` = ?, `comprador` = ?, `data` = ?, `horario` = ? WHERE `id` = ?"

    const values = [
        req.body.item,
        req.body.marca,
        req.body.preco,
        req.body.comprador,
        req.body.data,
        req.body.horario,
    ]

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err)

        return res.status(200).json()
    })
}

export const deleteVenda = (req, res) => {
    const q = "DELETE FROM vendas WHERE `id` = ?"

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err)

        return res.status(200).json()
    })
}