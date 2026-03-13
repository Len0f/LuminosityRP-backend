import express from "express";
import Tab from "../models/Tab.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET /api/rules
router.get("/", async (req, res) => {
  try {
    const tabs = await Tab.find().sort("key").lean();
    res.json(tabs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/rules/:key
router.get("/:key", async (req, res) => {
  try {
    const tab = await Tab.findOne({ key: req.params.key }).lean();
    if (!tab) return res.status(404).json({ message: "Onglet introuvable" });
    res.json(tab);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/rules/:key
router.put("/:key", protect, async (req, res) => {
  try {
    const { sections, label, emoji } = req.body;

    const cleanedSections = sections.map((section) => {
      const { _id: sid, ...sectionData } = section;
      return {
        ...(sid && !sid.toString().startsWith("new_") ? { _id: sid } : {}),
        ...sectionData,
        cards: (section.cards || []).map((card) => {
          const { _id: cid, ...cardData } = card;
          return {
            ...(cid && !cid.toString().startsWith("new_") ? { _id: cid } : {}),
            ...cardData,
          };
        }),
      };
    });

    const tab = await Tab.findOneAndUpdate(
      { key: req.params.key },
      {
        sections: cleanedSections,
        ...(label && { label }),
        ...(emoji && { emoji }),
      },
      { returnDocument: "after", runValidators: true },
    );
    if (!tab) return res.status(404).json({ message: "Onglet introuvable" });
    res.json(tab);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/rules/:key/sections
router.post("/:key/sections", protect, async (req, res) => {
  try {
    const tab = await Tab.findOne({ key: req.params.key });
    if (!tab) return res.status(404).json({ message: "Onglet introuvable" });
    const maxOrder = tab.sections.reduce((m, s) => Math.max(m, s.order), -1);
    tab.sections.push({ ...req.body, order: maxOrder + 1 });
    await tab.save();
    res.status(201).json(tab);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/rules/:key/sections/:sectionId
router.put("/:key/sections/:sectionId", protect, async (req, res) => {
  try {
    const tab = await Tab.findOne({ key: req.params.key });
    if (!tab) return res.status(404).json({ message: "Onglet introuvable" });
    const section = tab.sections.id(req.params.sectionId);
    if (!section)
      return res.status(404).json({ message: "Section introuvable" });
    Object.assign(section, req.body);
    await tab.save();
    res.json(tab);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/rules/:key/sections/:sectionId
router.delete("/:key/sections/:sectionId", protect, async (req, res) => {
  try {
    const tab = await Tab.findOne({ key: req.params.key });
    if (!tab) return res.status(404).json({ message: "Onglet introuvable" });
    tab.sections = tab.sections.filter(
      (s) => s._id.toString() !== req.params.sectionId,
    );
    await tab.save();
    res.json(tab);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/rules/:key/sections/:sectionId/cards
router.post("/:key/sections/:sectionId/cards", protect, async (req, res) => {
  try {
    const tab = await Tab.findOne({ key: req.params.key });
    if (!tab) return res.status(404).json({ message: "Onglet introuvable" });
    const section = tab.sections.id(req.params.sectionId);
    if (!section)
      return res.status(404).json({ message: "Section introuvable" });
    const maxOrder = section.cards.reduce((m, c) => Math.max(m, c.order), -1);
    section.cards.push({ ...req.body, order: maxOrder + 1 });
    await tab.save();
    res.status(201).json(tab);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/rules/:key/sections/:sectionId/cards/:cardId
router.put(
  "/:key/sections/:sectionId/cards/:cardId",
  protect,
  async (req, res) => {
    try {
      const tab = await Tab.findOne({ key: req.params.key });
      if (!tab) return res.status(404).json({ message: "Onglet introuvable" });
      const section = tab.sections.id(req.params.sectionId);
      if (!section)
        return res.status(404).json({ message: "Section introuvable" });
      const card = section.cards.id(req.params.cardId);
      if (!card) return res.status(404).json({ message: "Carte introuvable" });
      Object.assign(card, req.body);
      await tab.save();
      res.json(tab);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

// DELETE /api/rules/:key/sections/:sectionId/cards/:cardId
router.delete(
  "/:key/sections/:sectionId/cards/:cardId",
  protect,
  async (req, res) => {
    try {
      const tab = await Tab.findOne({ key: req.params.key });
      if (!tab) return res.status(404).json({ message: "Onglet introuvable" });
      const section = tab.sections.id(req.params.sectionId);
      if (!section)
        return res.status(404).json({ message: "Section introuvable" });
      section.cards = section.cards.filter(
        (c) => c._id.toString() !== req.params.cardId,
      );
      await tab.save();
      res.json(tab);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
);

export default router;
