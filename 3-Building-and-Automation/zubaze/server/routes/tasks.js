/**
 * Tasks API Routes
 * Handles all task-related endpoints with Auth0 verification
 */

const express = require('express');
const router = express.Router();
const { checkJwt, extractUserInfo, requireUserType } = require('../middleware/auth');
const dfinity = require('../services/dfinityIntegration');

router.use(checkJwt);
router.use(extractUserInfo);

/**
 * GET /api/tasks
 * Fetch all tasks for the developer
 */
router.get('/', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const tasks = await dfinity.getTasksByDeveloper(user.id);
    
    return res.json({
      ok: true,
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch tasks',
    });
  }
});

/**
 * POST /api/tasks
 * Create a new task
 */
router.post('/', requireUserType('developer'), async (req, res) => {
  try {
    const { user } = req;
    const taskData = {
      ...req.body,
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      developerId: user.id,
      createdAt: Date.now(),
    };

    const createdTask = await dfinity.createTask(taskData);

    return res.status(201).json({
      ok: true,
      data: createdTask,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to create task',
    });
  }
});

/**
 * PATCH /api/tasks/:id
 * Update a task
 */
router.patch('/:id', requireUserType('developer'), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await dfinity.updateTask(id, req.body);

    return res.json({
      ok: true,
      data: updatedTask,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to update task',
    });
  }
});

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
router.delete('/:id', requireUserType('developer'), async (req, res) => {
  try {
    const { id } = req.params;
    await dfinity.deleteTask(id);

    return res.json({
      ok: true,
      data: { message: 'Task deleted successfully' },
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to delete task',
    });
  }
});

module.exports = router;
