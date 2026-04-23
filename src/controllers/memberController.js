import { MemberModel } from '../models/memberModel.js';

export const MemberController = {
  // Mendapatkan semua daftar anggota beserta fitur pencarian
  async getAllMembers(req, res) {
    try {
      const members = await MemberModel.getAll(req.query.name);
      res.json(members);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Mendapatkan anggota berdasarkan ID spesifik
  async getMemberById(req, res) {
    try {
      const member = await MemberModel.getById(req.params.id);
      if (member) res.json(member);
      else res.status(404).json({ message: "Anggota tidak ditemukan" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async registerMember(req, res) {
    try {
      const newMember = await MemberModel.create(req.body);
      res.status(201).json({
        message: "Anggota berhasil didaftarkan!",
        data: newMember
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Memperbarui data anggota
  async updateMember(req, res) {
    try {
      const updatedMember = await MemberModel.update(req.params.id, req.body);
      res.json(updatedMember);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Menghapus data anggota
  async deleteMember(req, res) {
    try {
      const deletedMember = await MemberModel.delete(req.params.id);
      res.json(deletedMember);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

