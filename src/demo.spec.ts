import { describe, it, expect } from 'vitest';
import { isValidFutureDate, validateFormData } from './utils';
import type { HttpError } from '@sveltejs/kit';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

describe('validateDate test', () => {
	it('returns error if date is in the past', async () => {
		const pastDate = new Date('1988').toString();
		const result = isValidFutureDate(pastDate);
		expect(result).toBe(false);
	});
});

describe('validateFormData test', () => {
	it('returns error if title is not provided', () => {
		const formData = new FormData();
		const description = 'No title test.';
		const date = new Date().toDateString();
		formData.set('description', description);
		formData.set('date', date);

		try {
			validateFormData(formData);
			throw new Error('Expected validateFormData to throw, but it did not');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			expect(err.status).toBe(400);
			expect(err.body?.message).toBe('Title and Date are required');
		}
	});
});
