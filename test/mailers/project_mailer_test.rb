require "test_helper"

class ProjectMailerTest < ActionMailer::TestCase
  test "notify_user_assignment" do
    mail = ProjectMailer.notify_user_assignment
    assert_equal "Notify user assignment", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

  test "notify_user_removal" do
    mail = ProjectMailer.notify_user_removal
    assert_equal "Notify user removal", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
