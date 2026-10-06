'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { inputClass } from './shared';

export type Field = { key: string; label: string; type?: string; value?: string; options?: { value: string; label: string }[]; min?: number; max?: number };
export type ActionConfig = { title: string; description: string; submit?: string; fields: Field[]; onSubmit: (values: Record<string, string>) => void };
export function ActionDialog({ config, onClose }: { config: ActionConfig; onClose: () => void }) {
  const schema = z.object(Object.fromEntries(config.fields.map(field => [field.key, z.string().trim().min(1, `${field.label} is required`).refine(value => field.type !== 'email' || z.string().email().safeParse(value).success, 'Enter a valid email address').refine(value => field.type !== 'number' || (Number.isFinite(Number(value)) && Number(value) >= (field.min ?? 0) && Number(value) <= (field.max ?? 100000000)), 'Enter a number within the allowed range')])));
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Record<string, string>>({ resolver: zodResolver(schema), defaultValues: Object.fromEntries(config.fields.map(field => [field.key, field.value ?? field.options?.[0]?.value ?? ''])) });
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-[460px]"><DialogHeader><DialogTitle className="text-xl text-slate-800">{config.title}</DialogTitle><DialogDescription className="pt-1 text-xs leading-relaxed">{config.description}</DialogDescription></DialogHeader><form className="space-y-4 pt-2" onSubmit={handleSubmit(values => { config.onSubmit(values); })}>{config.fields.map(field => <div key={field.key}><label htmlFor={field.key} className="mb-1.5 block text-xs font-medium text-slate-700">{field.label}</label>{field.options ? <select id={field.key} className={inputClass} {...register(field.key)}>{field.options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select> : <input id={field.key} className={inputClass} type={field.type ?? 'text'} min={field.min} max={field.max} step={field.type === 'number' ? 'any' : undefined} {...register(field.key)} />}{errors[field.key] && <p className="mt-1 text-xs text-red-600">{String(errors[field.key]?.message)}</p>}</div>)}<div className="flex justify-end gap-2 border-t pt-4"><Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Cancel</Button><Button disabled={isSubmitting} className="rounded-lg px-5">{config.submit ?? 'Save changes'}</Button></div></form></DialogContent></Dialog>;
}
