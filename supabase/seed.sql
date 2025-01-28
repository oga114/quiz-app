-- 質問データを追加
INSERT INTO questions (id, question_text) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Next.js はどの言語をベースにしている？'),
  ('22222222-2222-2222-2222-222222222222', 'Supabase はどのデータベースを使っている？');

-- 選択肢データを追加
INSERT INTO options (id, question_id, option_text, is_correct) VALUES
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'JavaScript', true),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Python', false),
  ('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Ruby', false),

  ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'PostgreSQL', true),
  ('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'MySQL', false),
  ('bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'MongoDB', false);
