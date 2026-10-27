-- Add the optional questions and align database order with the moderator's grouped list.

update public.finding_talent_questions
set sort_order = sort_order + 1000;

insert into public.finding_talent_questions (id, sort_order, block, statement, assigned, kind)
values
  ('block-1-extra-1', 4, 'Bloque 1 · Si hay tiempo', 'La IA puede detectar si mientes en una entrevista.', 'Pregunta extra', 'discussion'),
  ('block-1-extra-2', 5, 'Bloque 1 · Si hay tiempo', 'Las empresas que no adopten IA en RH se van a quedar atrás.', 'Pregunta extra', 'discussion'),
  ('extra-1', 9, 'Preguntas extra', 'El talento del futuro no ejecuta, supervisa agentes.', 'Pregunta extra', 'discussion'),
  ('extra-2', 10, 'Preguntas extra', 'Si sabes usar IA, nunca te vas a quedar sin trabajo.', 'Pregunta extra', 'discussion'),
  ('extra-3', 11, 'Preguntas extra', 'Si la IA te ayudó a hacer el trabajo, no es realmente tuyo.', 'Pregunta extra', 'discussion')
on conflict (id) do update set
  sort_order = excluded.sort_order,
  block = excluded.block,
  statement = excluded.statement,
  assigned = excluded.assigned,
  kind = excluded.kind;

update public.finding_talent_questions set sort_order = 0 where id = 'warmup-opening';
update public.finding_talent_questions set sort_order = 1 where id = 'block-1-1';
update public.finding_talent_questions set sort_order = 2 where id = 'block-1-2';
update public.finding_talent_questions set sort_order = 3 where id = 'block-1-3';
update public.finding_talent_questions set sort_order = 6 where id = 'block-2-1';
update public.finding_talent_questions set sort_order = 7 where id = 'block-2-2';
update public.finding_talent_questions set sort_order = 8 where id = 'block-2-3';
update public.finding_talent_questions set sort_order = 12 where id = 'warmup-closing';

notify pgrst, 'reload schema';
