class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, :presence => true, :uniqueness => true

  def genPassword
    self.password = ('0'..'z').to_a.shuffle.first(8).join
  end

  # custom as_json
  def as_json( options=nil )
    { id: self.id, email: self.email, confirmed: self.confirmed?}
  end

end
