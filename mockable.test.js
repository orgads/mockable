import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mockable } from './index.js';

const original_node_env = process.env.NODE_ENV ?? 'development';

test('does not override in production', async t => {
	process.env.NODE_ENV = 'production';

	const worker = mockable(() => 'original');
	assert.throws(() => worker.override(() => 'mocked'));
	t.after(() => {
		if (worker.clear) {
			worker.clear();
		}
	});

	assert.equal(worker(), 'original');
	process.env.NODE_ENV = original_node_env;
});

test('does override in not-production', async t => {
	process.env.NODE_ENV = 'development';

	const worker = mockable(() => 'original');
	worker.override(() => 'mocked');
	t.after(() => worker.clear());

	assert.equal(worker(), 'mocked');
	process.env.NODE_ENV = original_node_env;
});

test('uses the mock when provided', async t => {
	const worker = mockable(() => {
		return 'original';
	});

	worker.override(() => 'mocked');
	t.after(() => worker.clear());

	assert.equal(worker(), 'mocked');
});
