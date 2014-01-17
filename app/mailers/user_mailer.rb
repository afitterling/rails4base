class UserMailer < ActionMailer::Base
  default from: "notifications@sp33c.de"

  def sign_up_confirmation_mail(user, password)
    @user = user
    @password = password
    mail(to: @user.email, subject: 'registration successfull!')
  end

end
