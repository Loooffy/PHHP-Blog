# frozen_string_literal: true

class PostDirector < ApplicationRecord
  belongs_to :post
  belongs_to :person

  validates :post_id, uniqueness: { scope: :person_id }

  def self.ransackable_attributes(auth_object = nil)
    %w[id post_id person_id created_at updated_at]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[post person]
  end
end
