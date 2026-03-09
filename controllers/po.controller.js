const PurchaseOrder = require('../models/po.model');

// @desc    Get all pos
// @route   GET /api/pos
// @access  Private
const getPurchaseOrders = async (req, res, next) => {
    try {
        const items = await PurchaseOrder.find({});
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) { next(error); }
};

// @desc    Get single po
// @route   GET /api/pos/:id
// @access  Private
const getPurchaseOrder = async (req, res, next) => {
    try {
        const item = await PurchaseOrder.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('PurchaseOrder not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Create new po
// @route   POST /api/pos
// @access  Private
const createPurchaseOrder = async (req, res, next) => {
    try {
        const item = await PurchaseOrder.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Update po
// @route   PUT /api/pos/:id
// @access  Private
const updatePurchaseOrder = async (req, res, next) => {
    try {
        const item = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) { res.status(404); throw new Error('PurchaseOrder not found'); }
        res.status(200).json({ success: true, data: item });
    } catch (error) { next(error); }
};

// @desc    Delete po
// @route   DELETE /api/pos/:id
// @access  Private
const deletePurchaseOrder = async (req, res, next) => {
    try {
        const item = await PurchaseOrder.findById(req.params.id);
        if (!item) { res.status(404); throw new Error('PurchaseOrder not found'); }
        await item.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) { next(error); }
};

module.exports = { getPurchaseOrders, getPurchaseOrder, createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder };
