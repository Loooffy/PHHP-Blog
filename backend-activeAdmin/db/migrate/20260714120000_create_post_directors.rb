# frozen_string_literal: true

class CreatePostDirectors < ActiveRecord::Migration[7.2]
  def up
    create_table :post_directors do |t|
      t.references :post, null: false, foreign_key: true
      t.references :person, null: false, foreign_key: true

      t.timestamps
    end

    add_index :post_directors, [:post_id, :person_id], unique: true

    execute <<~SQL.squish
      INSERT INTO post_directors (post_id, person_id, created_at, updated_at)
      SELECT id, director_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      FROM posts
      WHERE director_id IS NOT NULL
    SQL

    remove_foreign_key :posts, column: :director_id
    remove_index :posts, :director_id
    remove_column :posts, :director_id
  end

  def down
    add_reference :posts, :director, null: true, foreign_key: { to_table: :people }

    execute <<~SQL.squish
      UPDATE posts
      SET director_id = (
        SELECT person_id FROM post_directors
        WHERE post_directors.post_id = posts.id
        ORDER BY post_directors.id
        LIMIT 1
      )
    SQL

    drop_table :post_directors
  end
end
