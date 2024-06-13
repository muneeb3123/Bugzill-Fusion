# Preview all emails at http://localhost:3000/rails/mailers/project_mailer
class ProjectMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/project_mailer/notify_user_assignment
  def notify_user_assignment
    ProjectMailer.notify_user_assignment
  end

  # Preview this email at http://localhost:3000/rails/mailers/project_mailer/notify_user_removal
  def notify_user_removal
    ProjectMailer.notify_user_removal
  end

end
