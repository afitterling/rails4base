class UserMailer < ActionMailer::Base
  default from: APP_CONFIG[:mailer][:from]

  def sign_up_confirmation_mail(user, password)
    @user = user
    @password = password
    mail(to: @user.email, subject: 'registration successfull!')
  end

end
