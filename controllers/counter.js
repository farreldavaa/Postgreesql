const db = require("../utils/db")

const getMachineCounter = function (req, res) {
    const { dalmesin } = req.params

    if (dalmesin) {
        return res.status(200).json({
            success: true,
            message: "data mesin ditemukan !",
            counter: 34,
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Kode dal tidak valid !"
        })
    }
}

const getMachineNameCounter = function (req, res) {
    const { namamesin } = req.params

    if (namamesin) {
        return res.status(200).json({
            success: true,
            message: "data mesin ditemukan !",
            counter: 3554,
            nama: namamesin
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Kode dal tidak valid !"
        })
    }

}

const postMachine = async (req, res) => {
    try {
        const { dalmesin, counter } = req.body

        if (!dalmesin || !counter) {
            return res.status(400).json({
                success: false,
                message: "Dal mesin atau counter tidak valid !",
            })
        }

        const cekCounter = await db.query(
            `
                SELECT * FROM counters WHERE dal_mesin = '${dalmesin}'
            `
        )

        console.log(cekCounter.rows)

        if (cekCounter.rowCount > 0) {
            return res.status(400).json({
                success: false,
                message: "Data Dal Mesin Sudah ada, silahkan ganti yang lain !"
            })
        }


        await db.query(
            `INSERT INTO counters (dal_mesin, counter) VALUES ('${dalmesin}', ${counter})`
        )

        return res.status(201).json({
            success: true,
            message: "berhasil menambahkan data counter !"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }

}

const delCounter = async (req, res) => {
    try {
        const { id } = req.params

        await db.query(`DELETE FROM counters WHERE id_counter = ${id}`)

        return res.status(200).json({
            success: true,
            message: "Berhasil menghapus data counter"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error !"
        })
    }
}

module.exports = {
    getMachineCounter,
    getMachineNameCounter,
    postMachine,
    delCounter
}