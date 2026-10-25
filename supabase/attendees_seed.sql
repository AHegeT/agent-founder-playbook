-- Import/update the current event RSVP list.
-- Run 202610250003_attendee_roster.sql first. This is safe to run again:
-- existing rows are updated by email and any linked Supabase user_id is preserved.
-- RSVP values from the source list are kept, including Not Going.

insert into public.finding_talent_attendees (full_name, email, rsvp_status)
values
  ('Luis Derechin', 'ld@nir-yu.com', 'going'),
  ('Dania Alvarez', 'dania.tu27@dartmouth.edu', 'going'),
  ('Jovan', 'jovannotty@gmail.com', 'going'),
  ('Adrian Salcedo', 'adrian.f.salcedo@gmail.com', 'going'),
  ('Gerardo Ledesma', 'gera.ledesma.ramos@gmail.com', 'going'),
  ('Alex Salzman', 'alex@visionary.is', 'going'),
  ('Camila Godoy', 'camilagodoy21@gmail.com', 'going'),
  ('Monja Brink', 'monja.brink@columbia.edu', 'going'),
  ('Cristobal Santander', 'cristobal@byafluence.com', 'going'),
  ('Sergio Razo', 'sr@nir-yu.com', 'going'),
  ('Laura Heredia', 'laura_heredia@pulsocfo.com', 'going'),
  ('Miguel Chacon Garcia', 'miguel366032@gmail.com', 'going'),
  ('Miguel Del Monte', 'miguel@ssoagency.com', 'going'),
  ('Hameyalli', 'hame.elizalde@gmail.com', 'going'),
  ('Adrian Alcantar', 'adrianalcantar78@gmail.com', 'going'),
  ('Andy Karuza', 'andy@nachonacho.com', 'going'),
  ('Jorge Ayala', 'ayaroli@gmail.com', 'not_going'),
  ('Alma Luz Lazo Freymann', 'lazoalma@gmail.com', 'going'),
  ('Luis Gerardo Yanes Fal', 'luis.yanes@paralaje.com.mx', 'going'),
  ('Eduardo Sordo', 'eduardo.sordo@gmail.com', 'going'),
  ('Pablo Exeni', 'pablo.exeni@zeb.mx', 'going'),
  ('Eduardo Martínez Fonseca', 'eduardo@the-conscious-code.com', 'going'),
  ('Hussein Fawzi', 'hussein@noapartners.com', 'going'),
  ('Diego A', 'alonsocampos96@gmail.com', 'going'),
  ('Eduardo Gonzalez', 'eduardo_gzz@outlook.com', 'going'),
  ('Maria Paula Lopera', 'maria@capa.fi', 'going'),
  ('Maryna Shareyeva', 'marynaglobal@gmail.com', 'going'),
  ('Jesus Sandoval', 'jesus@dsac.ai', 'going'),
  ('Francisco Vassallo', 'francisco@dsac.ai', 'going'),
  ('Cesar Costa', 'ccosta@somniosoftware.com', 'going'),
  ('kelvin', 'kelvin@talktokai.com', 'going'),
  ('Alexis Vivas Rodriguez', 'fintechcareers@agentmail.to', 'going'),
  ('Mary Martinez', 'mary@wind-hr.com', 'going'),
  ('Ivonne Lazaro', 'hybom@yahoo.com', 'going'),
  ('Tulia Valdez', 'tulia.valdez@lapieza.io', 'going'),
  ('Sergio Torres Zamora', 's@agenticrank.dev', 'going'),
  ('Petter Oliveira', 'petter@aitia.work', 'going'),
  ('Fer Cano', 'cano_fer@lapieza.io', 'going'),
  ('Alexa Villegas', 'alexa.villegas@lapieza.io', 'going'),
  ('Samuel G', 'sam@arenapublica.com', 'going'),
  ('Alejandro Guzman', 'alejandro.guzman.h123@gmail.com', 'going'),
  ('Lilly Rothschild', 'lillianrothschild@gmail.com', 'going'),
  ('Sebastian Velez', 'kansoft4@gmail.com', 'going'),
  ('Laura Carrión', 'laura@concienciaco.com', 'not_going'),
  ('Tomás Ffrench-Davis', 'iam@tomasffrenchdavis.com', 'not_going'),
  ('Jairo Suarez', 'jairo@awana.io', 'going'),
  ('Tatiana Silva', 'tatianae.slv@gmail.com', 'going'),
  ('Nayeli Covarrubias', 'nayeli.covarrubias@softtek.com', 'not_going'),
  ('Sharon Silesky', 'sharon_st@lapieza.io', 'going'),
  ('Sandro Haro', 'sandro.haro@payboom.io', 'going'),
  ('Donovan Riaño', 'donovanriano@gmail.com', 'going'),
  ('Sinuhe Coronel', 'lesmonova@pm.me', 'going'),
  ('Alfredo Sarvide', 'asarvide9@gmail.com', 'going'),
  ('Ita Simancas', 'wimaso22@gmail.com', 'going'),
  ('Miguel Alejandro Guijarro', 'miguel.guijarro@recluta.chat', 'going'),
  ('Julien Entresangle', 'julien@fledge.net', 'going'),
  ('Alan Vázquez', 'alanvaa.06@gmail.com', 'going'),
  ('Raul Moguel Zaldivar', 'm@supplymango.com', 'going'),
  ('Tania Chuc', 't@tryroka.com', 'going'),
  ('David Hdz', 'info@fintech.us.com', 'going'),
  ('Jude Cowie', 'jcowcapital@gmail.com', 'going'),
  ('Ronni Samir Sulaka', 'ronni@noapartners.com', 'going'),
  ('Edgar Martínez Retes', 'edgar.retes@icloud.com', 'going')
on conflict (email) do update
set full_name = excluded.full_name,
    rsvp_status = excluded.rsvp_status,
    updated_at = now();

-- To add just Luis Derechin later, run:
-- insert into public.finding_talent_attendees (full_name, email, rsvp_status)
-- values ('Luis Derechin', 'ld@nir-yu.com', 'going')
-- on conflict (email) do update
-- set full_name = excluded.full_name, rsvp_status = excluded.rsvp_status, updated_at = now();
